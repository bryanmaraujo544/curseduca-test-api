/*
  Warnings:

  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `profileImg` VARCHAR(191) NULL;
