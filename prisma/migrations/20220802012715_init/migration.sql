/*
  Warnings:

  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;
