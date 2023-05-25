CREATE TABLE `comment` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`comment` text NOT NULL,
	`post_id` int,
	`author_id` int,
	`created_at` timestamp(2) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(2) NOT NULL DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `post` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(20) NOT NULL,
	`body` text NOT NULL,
	`image_url` varchar(2024),
	`author_id` int,
	`created_at` timestamp(2) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(2) NOT NULL DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` varchar(20) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`created_at` timestamp(2) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(2) NOT NULL DEFAULT (now()));
--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_post_id_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`);--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`);--> statement-breakpoint
ALTER TABLE `post` ADD CONSTRAINT `post_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`);