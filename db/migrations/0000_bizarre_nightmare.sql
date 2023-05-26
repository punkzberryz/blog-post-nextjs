CREATE TABLE `Comment` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`comment` text NOT NULL,
	`post_id` int,
	`author_id` int);
--> statement-breakpoint
CREATE TABLE `Post` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(20) NOT NULL,
	`body` text NOT NULL,
	`image_url` varchar(2024),
	`author_id` int);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` varchar(20) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL);
--> statement-breakpoint
CREATE UNIQUE INDEX `author_index` ON `Comment` (`author_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `post_index` ON `Comment` (`post_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `author_index` ON `Post` (`author_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_index` ON `User` (`email`);