CREATE TABLE `articles` (
	`id` text NOT NULL,
	`scope` text NOT NULL,
	`syntax` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`raw` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_title_unique` UNIQUE(`title`)
);
