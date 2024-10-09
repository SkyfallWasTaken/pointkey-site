import { db, comments } from '$lib/db';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import DOMPurify from 'isomorphic-dompurify';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		url: decodeURIComponent(params.url),
		comments: await db
			.select()
			.from(comments)
			.where(eq(comments.url, decodeURIComponent(params.url)))
			.orderBy(comments.timestamp)
			.all()
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const content = data.get('content');
		const url = data.get('url');

		const session = await locals.auth();
		const user = session?.user;
		if (!user) {
			console.log(session, user);
			return fail(401, { error: 'Unauthorized' });
		}

		if (!content) {
			return fail(400, { content, missing: true });
		}
		if (!url) {
			return fail(400, { url, missing: true });
		}

		const clean = DOMPurify.sanitize(content.toString());
		try {
			await db.insert(comments).values({
				url: decodeURIComponent(url.toString()),
				content: clean,
				authorId: user.name || user.email || 'Anonymous' // FIXME: change
			});
			return { success: true };
		} catch (error) {
			console.error('Error inserting comment:', error);
			return fail(500, { error: 'Failed to submit comment' });
		}
	}
};
