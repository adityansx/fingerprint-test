/*
  Warnings:

  - You are about to drop the `UserIP` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deviceIP` to the `UserFingerprint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserIP` DROP FOREIGN KEY `UserIP_userFp_fkey`;

-- DropIndex
DROP INDEX `UserFingerprint_deviceFp_key` ON `UserFingerprint`;

-- AlterTable
ALTER TABLE `UserFingerprint` ADD COLUMN `deviceIP` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `UserIP`;
