-- Drop existing indexes if they exist
DROP INDEX IF EXISTS "author_id_idx"; --> statement-breakpoint
DROP INDEX IF EXISTS "parent_id_idx"; --> statement-breakpoint
DROP INDEX IF EXISTS "url_idx"; --> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique"; --> statement-breakpoint

-- Add a new column for timestamp with the correct type
ALTER TABLE comments ADD COLUMN "new_timestamp" TEXT NOT NULL DEFAULT (strftime('%s', 'now'));  --> statement-breakpoint

-- Copy data from the old "timestamp" column to the new one
UPDATE comments SET "new_timestamp" = "timestamp"; --> statement-breakpoint

-- Drop the old "timestamp" column (SQLite doesn't support this directly, so ignore if not necessary in your case)
-- SQLite doesn't support DROP COLUMN, so just proceed with using the new column.

-- Optionally, you could rename the table, copy the data, and rename back, but it depends on your use case.

-- Recreate indexes
CREATE INDEX "author_id_idx" ON comments (author_id); --> statement-breakpoint
CREATE INDEX "parent_id_idx" ON comments (parent_id); --> statement-breakpoint
CREATE INDEX "url_idx" ON comments (url); --> statement-breakpoint

-- Create the unique index on the email column in the users table
CREATE UNIQUE INDEX "users_email_unique" ON users (email);
