DROP INDEX `author_index` ON `Comment`;--> statement-breakpoint
DROP INDEX `post_index` ON `Comment`;--> statement-breakpoint
DROP INDEX `author_index` ON `Post`;--> statement-breakpoint
CREATE INDEX `author_index` ON `Comment` (`author_id`);--> statement-breakpoint
CREATE INDEX `post_index` ON `Comment` (`post_id`);--> statement-breakpoint
CREATE INDEX `author_index` ON `Post` (`author_id`);