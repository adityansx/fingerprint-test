/*
  Warnings:

  - You are about to drop the column `deviceFp` on the `UserFingerprint` table. All the data in the column will be lost.
  - You are about to drop the column `deviceIP` on the `UserFingerprint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userFp]` on the table `UserFingerprint` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userFp` to the `UserFingerprint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserFingerprint` DROP COLUMN `deviceFp`,
    DROP COLUMN `deviceIP`,
    ADD COLUMN `userFp` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserIPAddresses` (
    `id` VARCHAR(191) NOT NULL,
    `userIP` VARCHAR(191) NOT NULL,
    `deviceFp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UserFingerprint_userFp_key` ON `UserFingerprint`(`userFp`);

-- AddForeignKey
ALTER TABLE `UserIPAddresses` ADD CONSTRAINT `UserIPAddresses_deviceFp_fkey` FOREIGN KEY (`deviceFp`) REFERENCES `UserFingerprint`(`userFp`) ON DELETE RESTRICT ON UPDATE CASCADE;
