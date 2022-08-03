/*
  Warnings:

  - You are about to drop the column `userId` on the `like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_userId_fkey`;

-- AlterTable
ALTER TABLE `like` DROP COLUMN `userId`,
    ADD COLUMN `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
