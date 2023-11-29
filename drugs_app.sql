-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2023 at 01:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `drugs_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2023_05_15_180857_users', 1),
(3, '2023_11_25_210912_drugs', 1),
(4, '2023_11_27_103548_drug_categories', 1),
(5, '2023_11_29_031756_orders', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categories`
--

CREATE TABLE `tbl_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_categories`
--

INSERT INTO `tbl_categories` (`id`, `category_name`, `created_at`, `updated_at`) VALUES
(1, 'antibiotics', '2023-11-29 00:51:11', '2023-11-29 00:51:11'),
(2, 'painkillers', '2023-11-29 00:51:19', '2023-11-29 00:51:19'),
(3, 'antidepressant', '2023-11-29 00:51:33', '2023-11-29 00:51:33'),
(4, 'smoke', '2023-11-29 00:52:32', '2023-11-29 00:52:32'),
(5, 'antibugs', '2023-11-29 01:32:38', '2023-11-29 01:32:38'),
(6, 'antifungal', '2023-11-29 08:52:17', '2023-11-29 08:52:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_drugs`
--

CREATE TABLE `tbl_drugs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `drug_name` varchar(255) NOT NULL,
  `drug_category` varchar(255) NOT NULL,
  `drug_image` varchar(255) NOT NULL,
  `drug_price` int(11) NOT NULL,
  `drug_description` longtext NOT NULL,
  `unit_quantity` int(11) NOT NULL,
  `unit_description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_drugs`
--

INSERT INTO `tbl_drugs` (`id`, `drug_name`, `drug_category`, `drug_image`, `drug_price`, `drug_description`, `unit_quantity`, `unit_description`, `created_at`, `updated_at`) VALUES
(1, 'Amoxilin', 'antibiotics', 'https://source.unsplash.com/random/200x200?sig=1', 400, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 200, 'Text', '2023-11-29 00:59:22', '2023-11-29 01:32:07'),
(3, 'Probeta -N', 'antibiotics', 'https://firebasestorage.googleapis.com/v0/b/thedawa-630f9.appspot.com/o/MedicineImages%2Fmedical%20photo?alt=media&token=a5a34306-d26f-4039-b8ac-ab94ddf62d4c', 300, 'Quench your body\'s thirst for health with AquaVital Drops. Packed with essential minerals, it supports hydration, improves skin radiance, and rejuvenates from within. Drink to vitality.', 200, '50 pills per can', '2023-11-29 08:58:33', '2023-11-29 08:58:33'),
(4, 'MiracleZest Capsules', 'antidepressant', 'https://firebasestorage.googleapis.com/v0/b/thedawa-630f9.appspot.com/o/MedicineImages%2Fmedical%20photo?alt=media&token=a5650445-b3e8-4564-a2a0-2d615db35216', 2000, 'Unleash boundless energy with these revitalizing capsules. Formulated with natural herbs, it boosts vitality, enhances focus, and promotes overall well-being. Feel the zest in every moment.', 9000, '25 pills per can', '2023-11-29 08:59:34', '2023-11-29 08:59:34'),
(5, 'LunarLift Elixir', 'antidepressant', 'https://firebasestorage.googleapis.com/v0/b/thedawa-630f9.appspot.com/o/MedicineImages%2Fmedical%20photo?alt=media&token=38eec51c-ec7f-408f-8d7c-48f6350ce8d1', 5000, 'Elevate your mood and soothe stress with LunarLift. This herbal elixir, crafted under moonlight, brings calmness and balance. Unwind naturally and embrace the serenity of the night.', 30, '300ml per can', '2023-11-29 09:00:40', '2023-11-29 09:00:40');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`order_details`)),
  `user_token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `order_details`, `user_token`, `created_at`, `updated_at`) VALUES
(1, '[{\"id\":1,\"drug_name\":\"Amoxilin\",\"drug_category\":\"antibiotics\",\"drug_image\":\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/thedawa-630f9.appspot.com\\/o\\/MedicineImages%2Fmedical%20photo?alt=media&token=61377f46-2644-47c5-90a0-c63670f48ea6\",\"drug_price\":100,\"drug_description\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\",\"unit_quantity\":200,\"unit_description\":\"Text\",\"created_at\":\"2023-11-29T03:59:22.000000Z\",\"updated_at\":\"2023-11-29T03:59:22.000000Z\",\"quantity\":2,\"total_price\":200}]', '6fz8-<fkP-:\"OL-Q?h.', '2023-11-29 01:25:34', '2023-11-29 01:25:34'),
(2, '[{\"id\":1,\"drug_name\":\"Amoxilin\",\"drug_category\":\"antibiotics\",\"drug_image\":\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/thedawa-630f9.appspot.com\\/o\\/MedicineImages%2Fmedical%20photo?alt=media&token=61377f46-2644-47c5-90a0-c63670f48ea6\",\"drug_price\":100,\"drug_description\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\",\"unit_quantity\":200,\"unit_description\":\"Text\",\"created_at\":\"2023-11-29T03:59:22.000000Z\",\"updated_at\":\"2023-11-29T03:59:22.000000Z\",\"quantity\":1,\"total_price\":100}]', '6fz8-<fkP-:\"OL-Q?h.', '2023-11-29 01:29:29', '2023-11-29 01:29:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_token` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `user_name`, `user_role`, `user_email`, `user_token`, `user_password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Sofay Go', 'administrator', 'sofaygo@gmail.com', 'Qdzn-%{\'4-HrDl-xC.f', '$2y$10$RbuL5H/3kaMd7qh5NnlEU.GIP9v1obDskr./wSHntFRVhU1RPtoim', NULL, '2023-11-29 00:55:02', '2023-11-29 00:55:02'),
(2, 'Danroy Mwangi', 'administrator', 'danroy.mwangi@strathmore.edu', ')_c`-gI`h-;t8b->2vl', '$2y$10$glpHD89ifYLVYC24iNfGuOPCew/dZ/n4OFMp.mj7Hbz8GCdxBr412', NULL, '2023-11-29 01:00:33', '2023-11-29 01:34:52'),
(3, 'Nelson Mwangi', 'user', 'nelsonmwangi197@gmail.com', '6fz8-<fkP-:\"OL-Q?h.', '$2y$10$.w1EQg9RXO8iU/dWmSYHpe0GCUIPm7JUn8XEPMGavt.PjIOE49VhG', NULL, '2023-11-29 01:25:17', '2023-11-29 01:34:24'),
(5, 'Ben Tennyson', 'user', 'bentenn@gmail.com', '`xjA-5O-G-j4+]-.=lE', '$2y$10$gGvttPEZ8xVpvGe2WtPy6OGsEYMzCd3WvMNvOH5Non9mpKvFWjTYK', NULL, '2023-11-29 08:44:48', '2023-11-29 08:44:48'),
(6, 'Helene Krista', 'user', 'helenekrista@gmail.com', 'O/Ow-cSHB-6ALq--)->', '$2y$10$MAueoL4ebDky3hAi/Hf07u5nEUzin7hZ7nVZ9mUdq6Z0AQtiPBR2e', NULL, '2023-11-29 08:47:23', '2023-11-29 08:47:23'),
(7, 'John Smith', 'user', 'johnsmith@gmail.com', '_#$E-d$|O-8\';K-DYSb', '$2y$10$HFBK4CIYX1aZJKPQMdB3ye2d6w3Q4Jzv9JcWK4VYxPaGRgoeFy39u', NULL, '2023-11-29 08:47:33', '2023-11-29 08:47:33'),
(8, 'Aubrey Johnson', 'user', 'aubreyjohn@gmail.com', 'RY.A-#z\'>-SX87-5F)2', '$2y$10$Bm690X61T62ebnQrbEMulOAsSWtzb3ouENBsJcZkddC/E3gt9h7Wm', NULL, '2023-11-29 08:47:44', '2023-11-29 08:47:44'),
(9, 'Halle Berry', 'administrator', 'halleberry@gmail.com', 'z][#-FQI*-Q<]j-PrTR', '$2y$10$wF7C92I36oA5BpfxnT/6keOvQlrbLORPgS/dmjYh8qbgsCMkzfrYO', NULL, '2023-11-29 08:48:39', '2023-11-29 08:48:39'),
(10, 'William Ruto', 'administrator', 'williamruto@gmail.com', 'FAXO-GmgF-<./n-3R]K', '$2y$10$94Ud.JN3Ppj7I94Y2TenVeeSsRF9qlw95CXE3713mnRotyWwdVvi6', NULL, '2023-11-29 08:50:04', '2023-11-29 08:50:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_drugs`
--
ALTER TABLE `tbl_drugs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tbl_users_id_unique` (`id`),
  ADD UNIQUE KEY `tbl_users_user_email_unique` (`user_email`),
  ADD UNIQUE KEY `tbl_users_user_token_unique` (`user_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_drugs`
--
ALTER TABLE `tbl_drugs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
