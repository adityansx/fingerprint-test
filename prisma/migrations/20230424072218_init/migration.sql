-- CreateTable
CREATE TABLE `UserFingerprint` (
    `id` VARCHAR(191) NOT NULL,
    `deviceFp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserFingerprint_deviceFp_key`(`deviceFp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserIP` (
    `id` VARCHAR(191) NOT NULL,
    `deviceIP` VARCHAR(191) NOT NULL,
    `userFp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserIP` ADD CONSTRAINT `UserIP_userFp_fkey` FOREIGN KEY (`userFp`) REFERENCES `UserFingerprint`(`deviceFp`) ON DELETE RESTRICT ON UPDATE CASCADE;
