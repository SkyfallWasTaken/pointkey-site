import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { comments, users, type Comment, type User } from './schema';
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from '$env/static/private';

export { comments, users, type Comment, type User };

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
export const db = drizzle(client);
