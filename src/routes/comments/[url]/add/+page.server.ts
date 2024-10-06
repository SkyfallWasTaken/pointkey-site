import { fail, json } from '@sveltejs/kit';
import { db, comments } from '$lib/db';
import DOMPurify from 'dompurify';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const content = data.get('content');
		let url = data.get('url');

		if (typeof content !== 'string' || content.length === 0) {
			return fail(400, { content, missing: true });
		}
		if (typeof url !== 'string' || url.length === 0) {
			return fail(400, { url, missing: true });
		}

		const clean = DOMPurify.sanitize(content);
		if (clean.length === 0) {
			return fail(400, { content, missing: true });
		}

		url = decodeURIComponent(params.url);

		await db
			.insert(comments)
			.values({
				url,
				content: clean,
				authorId: 'me!'
			})
			.execute();

		return json({ ok: true });
	}
};
