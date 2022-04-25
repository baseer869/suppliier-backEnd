-- Adminer 4.8.1 MySQL 8.0.26 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `auth_keys`;
CREATE TABLE `auth_keys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `auth_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auth_keys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;

INSERT INTO `auth_keys` (`id`, `user_id`, `auth_key`, `created_at`, `updated_at`) VALUES
(1,	24,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY0NTIwODU1NiwiZXhwIjoxNjQ1MjEyMTU2fQ.h05AesdVDIFjHPUyDiBp7PLi6wK5UkOCmiUsdPC8jZ0',	'0000-00-00 00:00:00',	'2022-02-18 18:22:36'),
(2,	29,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImlhdCI6MTY0NTYxOTk5MCwiZXhwIjoxNjQ1NjIzNTkwfQ.VS0gt4_FuEGxifZbssJMimJhoxaG6SWYRMfibkXe4xs',	'2022-02-23 12:39:50',	'2022-02-23 12:39:50'),
(3,	30,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY0ODA0MzA3NCwiZXhwIjoxNjQ4MDQ2Njc0fQ.hAQa2Tn9I2yxDhUNHUBjBBHMObg9T3EB0j7-b6cBXro',	'2022-02-23 16:48:10',	'2022-03-23 13:44:34'),
(4,	32,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTY1MDAyNjQ4Mn0.CBZg4b7tixjY4slb751L56yIK22UTf6lZwyzqGsaDkQ',	'2022-03-23 13:45:12',	'2022-04-15 12:41:22');

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `totalPrice` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `shopId` bigint DEFAULT NULL,
  `productId` bigint DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL DEFAULT '0' COMMENT '0 for active 1 for inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;

INSERT INTO `carts` (`id`, `totalPrice`, `quantity`, `userId`, `shopId`, `productId`, `active`, `status`, `created_at`, `updated_at`) VALUES
(76,	7800,	41,	32,	2,	112,	NULL,	'0',	'2022-04-14 18:15:24',	'2022-04-15 12:47:05');

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `attachment` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `color` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;

INSERT INTO `categories` (`id`, `name`, `description`, `attachment`, `color`, `created_at`, `updated_at`) VALUES
(1,	'Educational  Books & Accessories',	'all kind of education books',	NULL,	'#fff',	'2022-01-24 07:40:07',	'2022-01-24 07:40:07'),
(2,	'Stationary',	'we have all kind of stationary',	NULL,	'#bccbe8',	'2022-01-24 07:40:07',	'2022-01-24 07:40:07');

DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lat` float DEFAULT NULL,
  `long` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `markets`;
CREATE TABLE `markets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `attachment` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `markets` (`id`, `name`, `description`, `attachment`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES
(1,	'Super market',	'Pharmacy, Restaurant, all in one place ',	NULL,	23.233,	12.1223,	'2022-01-24 07:40:07',	'2022-01-24 07:40:07'),
(2,	'G-11 Markaz',	'Pharmacy, Restaurant, all in one place ',	NULL,	23.233,	12.1223,	'2022-01-24 07:40:07',	'2022-01-24 07:40:07');

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `attachment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs,
  `isAvailable` tinyint DEFAULT NULL,
  `longDesc` varchar(655) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `price` float DEFAULT NULL,
  `unitType` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `discountedPrice` float DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `storeChoice` enum('0','1') COLLATE utf8mb4_0900_as_cs DEFAULT '0' COMMENT 'store choice products',
  `shop_id` bigint DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;

INSERT INTO `products` (`id`, `name`, `description`, `attachment`, `isAvailable`, `longDesc`, `price`, `unitType`, `discountedPrice`, `stock`, `storeChoice`, `shop_id`, `category_id`, `created_at`, `updated_at`) VALUES
(100,	'product 446',	'description',	'',	1,	' Nestle koko krunch breakfast cereal is made with whole grain which               contains more dietary fibre, nutrition values and important               minerals like iron and calcium which is really important for               healthy red blood cells and bone development in children',	20300,	'kg',	190,	10,	NULL,	2,	1,	'2022-03-09 03:01:20',	'2022-03-09 03:01:20'),
(112,	'Flyer Bags',	'Small Courier Flyer Bags With Address Pocket 8 X 11 Inches - 50 Pieces',	'',	1,	' Nestle koko krunch breakfast cereal is made with whole grain which               contains more dietary fibre, nutrition values and important               minerals like iron and calcium which is really important for               healthy red blood cells and bone development in children',	100,	'kg',	190,	10,	NULL,	2,	1,	'2022-03-09 03:01:20',	'2022-03-09 03:01:20'),
(113,	'Cling Stretch Wrap Film',	'12 Inch Wide 300 Meters Length Cling Stretch Wrap Film For Packing Shrink Wrap',	'',	1,	' Nestle koko krunch breakfast cereal is made with whole grain which               contains more dietary fibre, nutrition values and important               minerals like iron and calcium which is really important for               healthy red blood cells and bone development in children',	20300,	'kg',	190,	10,	NULL,	2,	1,	'2022-03-09 03:01:20',	'2022-03-09 03:01:20'),
(114,	'Cling Stretch Wrap Film',	'12 Inch Wide 300 Meters Length Cling Stretch Wrap Film For Packing Shrink Wrap',	'',	1,	' Nestle koko krunch breakfast cereal is made with whole grain which               contains more dietary fibre, nutrition values and important               minerals like iron and calcium which is really important for               healthy red blood cells and bone development in children',	200,	'kg',	190,	10,	NULL,	2,	1,	'2022-03-09 03:01:20',	'2022-03-09 03:01:20'),
(115,	'Cling Stretch Wrap Film',	'12 Inch Wide 300 Meters Length Cling Stretch Wrap Film For Packing Shrink Wrap',	'',	1,	' Nestle koko krunch breakfast cereal is made with whole grain which               contains more dietary fibre, nutrition values and important               minerals like iron and calcium which is really important for               healthy red blood cells and bone development in children',	20300,	'kg',	190,	10,	'1',	2,	1,	'2022-03-09 03:01:20',	'2022-03-09 03:01:20'),
(116,	'Rich Dad, Poor Dad by Robert T. Kiyosaki',	'Rich Dad, Poor Dad by Robert T. Kiyosaki,Rich Dad, Poor Dad by Robert T. Kiyosaki',	'',	1,	'Rich Dad, Poor Dad by Robert T. Kiyosaki,Rich Dad, Poor Dad by Robert T. Kiyosaki',	233,	'kg',	190,	7,	'1',	2,	1,	'2022-04-02 09:51:06',	'2022-04-02 09:51:06');

DROP TABLE IF EXISTS `shop_and_categories`;
CREATE TABLE `shop_and_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `shop_id` bigint NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `shop_and_categories_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shop_and_categories_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `shop_and_categories` (`id`, `category_id`, `shop_id`, `created_at`, `updated_at`) VALUES
(1,	1,	2,	'2022-01-24 07:40:07',	'2022-01-24 07:40:07'),
(2,	2,	2,	'2022-01-24 07:40:07',	'2022-01-24 07:40:07'),
(3,	1,	3,	'2022-01-24 07:40:07',	'2022-01-24 07:40:07');

DROP TABLE IF EXISTS `shop_categories`;
CREATE TABLE `shop_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attachment` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;

INSERT INTO `shop_categories` (`id`, `name`, `description`, `attachment`, `created_at`, `updated_at`) VALUES
(1,	'Books & Accessories',	'all kind of education books',	'',	'2022-01-24 07:40:07',	'2022-01-24 07:40:07');

DROP TABLE IF EXISTS `shop_requests`;
CREATE TABLE `shop_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `shop_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` enum('pending','onReview','accepted','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT 'pending',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;

INSERT INTO `shop_requests` (`id`, `name`, `shop_name`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(1,	'Ali hamza',	NULL,	NULL,	'pending',	'2022-02-18 08:18:31',	'2022-02-18 08:18:31'),
(2,	'Ali hamza',	'Subhan mobile',	'03449028644',	'onReview',	'2022-02-18 08:20:27',	'2022-02-23 16:31:44'),
(3,	'Ali hamza',	'Subhan mobile',	'03449028644',	'pending',	'2022-02-23 12:00:00',	'2022-02-23 12:00:00'),
(4,	'Ali hamza',	'Subhan mobile',	'03449028644',	'pending',	'2022-02-23 16:23:30',	'2022-02-23 16:23:30'),
(5,	'Ali hamza',	'Al aftrat mobile',	'03449028644',	'pending',	'2022-02-23 16:24:12',	'2022-02-23 16:24:12'),
(6,	'Ali hamza',	'Al aftrat mobile',	'03449028644',	'pending',	'2022-02-23 16:24:34',	'2022-02-23 16:24:34'),
(7,	'Ali hamza',	'Al aftrat mobile',	'03449028644',	'pending',	'2022-02-23 16:25:45',	'2022-02-23 16:25:45'),
(8,	'Hazma khan ',	'Book & Books store',	'07866675',	'onReview',	'2022-02-23 16:31:06',	'2022-02-23 16:32:02');

DROP TABLE IF EXISTS `shops`;
CREATE TABLE `shops` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` int DEFAULT NULL,
  `title` varchar(200) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `attachement` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `user_id` int DEFAULT NULL,
  `shop_category_id` bigint DEFAULT NULL,
  `request_id` int DEFAULT NULL,
  `market_id` bigint DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shop_category_id` (`shop_category_id`),
  KEY `request_id` (`request_id`),
  KEY `user_id` (`user_id`),
  KEY `market_id` (`market_id`),
  KEY `category_id` (`category_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `shops_ibfk_1` FOREIGN KEY (`shop_category_id`) REFERENCES `shop_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shops_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `shop_requests` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `shops_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shops_ibfk_4` FOREIGN KEY (`market_id`) REFERENCES `markets` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shops_ibfk_5` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shops_ibfk_6` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;

INSERT INTO `shops` (`id`, `name`, `phone`, `title`, `attachement`, `status`, `user_id`, `shop_category_id`, `request_id`, `market_id`, `category_id`, `city_id`, `created_at`, `updated_at`) VALUES
(2,	'Madina Cash & Carry',	77373773,	'groceries',	'',	'1',	30,	1,	8,	1,	1,	NULL,	'2022-02-23 17:32:33',	'2022-02-23 17:43:43'),
(3,	'Jameel Books & Stationary',	77373773,	'stationary',	'',	'1',	30,	1,	8,	2,	1,	NULL,	'2022-02-23 17:32:33',	'2022-02-23 17:43:43'),
(4,	'Madina Food',	77373773,	'Foods',	'',	'1',	30,	1,	8,	1,	1,	NULL,	'2022-02-23 17:32:33',	'2022-02-23 17:43:43');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `zip` int DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` enum('1','2') DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='1 for admin 2 for vendor';

INSERT INTO `users` (`id`, `username`, `email`, `state`, `password`, `city`, `zip`, `phone`, `address`, `token`, `role`, `active`, `createdAt`, `updatedAt`) VALUES
(5,	'ahmed',	NULL,	NULL,	'ahmed123',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-19 07:50:36',	'2022-01-19 07:50:36'),
(6,	'ahmed',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-19 08:13:45',	'2022-01-19 08:13:45'),
(7,	'ahmed',	NULL,	NULL,	'ahmed123',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-19 08:20:16',	'2022-01-19 08:20:16'),
(8,	'ahmed',	NULL,	NULL,	'ahmed123',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 06:02:43',	'2022-01-24 06:02:43'),
(9,	'',	NULL,	NULL,	'ahmed123',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 07:17:22',	'2022-01-24 07:17:22'),
(10,	'test',	NULL,	NULL,	'ahmed123',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 07:35:19',	'2022-01-24 07:35:19'),
(11,	'test',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 07:39:23',	'2022-01-24 07:39:23'),
(12,	'test',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 07:39:46',	'2022-01-24 07:39:46'),
(13,	'test',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 07:40:07',	'2022-01-24 07:40:07'),
(14,	'test',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 08:10:10',	'2022-01-24 08:10:10'),
(15,	'test',	NULL,	NULL,	'bf9661defa3daecacfde5bde0214c4a439351d4d',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 08:12:56',	'2022-01-24 08:12:56'),
(16,	'test',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 08:13:44',	'2022-01-24 08:13:44'),
(17,	'test',	NULL,	NULL,	'cdc8e8820ddf377ec75ef13c7d70303764e38b3a',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-24 08:14:16',	'2022-01-24 08:14:16'),
(18,	'test',	NULL,	NULL,	'cdc8e8820ddf377ec75ef13c7d70303764e38b3a',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	0,	'2022-01-24 09:35:44',	'2022-01-24 09:35:44'),
(19,	'baseer ahmed',	NULL,	NULL,	'1c7136ab2a9af6f04909cce015ba0e3e5bab3da6',	NULL,	NULL,	NULL,	NULL,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhc2VlciBhaG1lZCIsImlhdCI6MTY0MzAyNjQ4OCwiZXhwIjoxNjQzMDI2NTQ4fQ.Rij92WeFtchVcpwBqVf1nog7yTMAzrHijU9aLtYnVkg',	NULL,	0,	'2022-01-24 09:36:24',	'2022-01-24 12:14:48'),
(20,	'root',	NULL,	NULL,	'01c06d2c22ca9963fa236af57a5afa3b365f8a47',	NULL,	NULL,	NULL,	NULL,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJvb3QiLCJpYXQiOjE2NDMwMjc0OTQsImV4cCI6MTY0MzAyNzU1NH0.rOWyNsDU9SxQ43DXLpPj_AX0Nul_1Q7YTb0j0DsCcqc',	NULL,	1,	'2022-01-24 12:30:39',	'2022-01-24 12:31:34'),
(21,	'admin',	NULL,	NULL,	'a122c715827b845809546bd391a7a4de3d48a12f',	NULL,	NULL,	NULL,	NULL,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQzMDk1ODc3LCJleHAiOjE2NDMwOTU5Mzd9.OvveSLzw67dm2B_cKj7vZ48ED9H9zSnX_RUjS95LFtY',	'1',	1,	'2022-01-24 12:35:08',	'2022-01-25 07:31:17'),
(22,	'admin',	'admin@gmail.comm',	NULL,	'68aeb8c02944e4f501a967b26125ee9dacf07edc',	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	0,	'2022-01-25 09:17:44',	'2022-01-25 09:17:44'),
(23,	'admin',	'admin@gmail.com',	NULL,	'68aeb8c02944e4f501a967b26125ee9dacf07edc',	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	0,	'2022-01-25 09:19:15',	'2022-01-25 09:19:15'),
(24,	'admin1',	'admin1@gmail.com',	NULL,	'68aeb8c02944e4f501a967b26125ee9dacf07edc',	NULL,	NULL,	NULL,	NULL,	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTY0NTIwNTk1OSwiZXhwIjoxNjQ1MjA5NTU5fQ.a1bFhZI5_JNJVFzUvicgKm4SQACwzNOdCRQugpUfDpg',	'1',	0,	'2022-01-25 09:38:31',	'2022-02-18 17:39:19'),
(25,	'test',	'test@gmail.com',	NULL,	'68aeb8c02944e4f501a967b26125ee9dacf07edc',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-01-25 10:55:51',	'2022-01-25 10:55:51'),
(26,	'test',	'vendor@gmail.com',	NULL,	'68aeb8c02944e4f501a967b26125ee9dacf07edc',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-02-18 08:07:40',	'2022-02-18 08:07:40'),
(27,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-02-18 08:13:44',	'2022-02-18 08:13:44'),
(28,	'test',	'vendor@gmail.com',	NULL,	'601f1889667efaebb33b8c12572835da3f027f78',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-02-23 12:26:24',	'2022-02-23 12:26:24'),
(29,	'vendor',	'vendor1@gmail.com',	NULL,	'601f1889667efaebb33b8c12572835da3f027f78',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	0,	'2022-02-23 12:32:16',	'2022-02-23 12:32:16'),
(30,	'ali hamza',	'book&BookStore@gmail.com',	NULL,	'601f1889667efaebb33b8c12572835da3f027f78',	NULL,	NULL,	NULL,	NULL,	NULL,	'2',	1,	'2022-02-23 16:47:45',	'2022-02-23 16:47:45'),
(31,	'baseer ahmed',	'book&BookStore@gmail.com',	NULL,	'601f1889667efaebb33b8c12572835da3f027f78',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	1,	'2022-02-28 17:28:50',	'2022-02-28 17:28:50'),
(32,	'baseer ahmed',	'baseerahmed@gmail.com',	NULL,	'601f1889667efaebb33b8c12572835da3f027f78',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	1,	'2022-03-23 13:44:58',	'2022-03-23 13:44:58');

-- 2022-04-19 06:07:20
