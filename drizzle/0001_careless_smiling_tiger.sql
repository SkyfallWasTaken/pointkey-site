CREATE INDEX `author_id_idx` ON `comments` (`author_id`);--> statement-breakpoint
CREATE INDEX `parent_id_idx` ON `comments` (`parent_id`);--> statement-breakpoint
CREATE INDEX `url_idx` ON `comments` (`url`);