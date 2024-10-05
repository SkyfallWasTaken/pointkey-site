import { db, comments } from '$lib/db';
import { eq } from 'drizzle-orm';

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
