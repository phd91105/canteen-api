import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrderRealtion1626533394820 implements MigrationInterface {
    name = 'addOrderRealtion1626533394820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `details` `details` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `image` `image` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `details` `details` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `image` `image` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `catId` `catId` int NULL");
        await queryRunner.query("ALTER TABLE `order_details` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `order_details` DROP COLUMN `orderId`");
        await queryRunner.query("ALTER TABLE `order_details` ADD `orderId` bigint NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `section` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `section` CHANGE `remarks` `remarks` text NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `order_details` ADD CONSTRAINT `FK_147bc15de4304f89a93c7eee969` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_details` DROP FOREIGN KEY `FK_147bc15de4304f89a93c7eee969`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `section` CHANGE `remarks` `remarks` text NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `section` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `order` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `order_details` DROP COLUMN `orderId`");
        await queryRunner.query("ALTER TABLE `order_details` ADD `orderId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `order_details` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `catId` `catId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `image` `image` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `details` `details` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `image` `image` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `details` `details` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
    }

}
