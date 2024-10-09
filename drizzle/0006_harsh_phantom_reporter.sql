DROP INDEX IF EXISTS "author_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "parent_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "url_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "name" TO "name" text NOT NULL DEFAULT 'hi';--> statement-breakpoint
CREATE INDEX `author_id_idx` ON `comments` (`author_id`);--> statement-breakpoint
CREATE INDEX `parent_id_idx` ON `comments` (`parent_id`);--> statement-breakpoint
CREATE INDEX `url_idx` ON `comments` (`url`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);