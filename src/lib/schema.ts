import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const comments = sqliteTable('comments', {
	url: text('url'),
	authorId: text('author_id').notNull(),
	upvotes: integer('upvotes').notNull().default(0),
	downvotes: integer('downvotes').notNull().default(0),
	parentId: text('parent_id'), // For replies, null if it's a top-level comment
	timestamp: text('timestamp')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique()
});
