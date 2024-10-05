import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { comments, users } from './schema';
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from '$env/static/private';

export { comments, users };

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
export const db = drizzle(client);
