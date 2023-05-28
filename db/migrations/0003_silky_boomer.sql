ALTER TABLE `Comment` MODIFY COLUMN `post_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Comment` MODIFY COLUMN `author_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Post` MODIFY COLUMN `author_id` int NOT NULL;