import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTable1626512745171 implements MigrationInterface {
    name = 'renameTable1626512745171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_details` DROP COLUMN `order_id`");
        await queryRunner.query("ALTER TABLE `order_details` DROP COLUMN `food_id`");
        await queryRunner.query("ALTER TABLE `order_details` ADD `orderId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `order_details` ADD `foodId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `details` `details` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `image` `image` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `details` `details` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `image` `image` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `catId` `catId` int NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `status` `status` enum ('0', '1', '2', '3') NOT NULL");
        await queryRunner.query("ALTER TABLE `order_details` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `section` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `section` CHANGE `remarks` `remarks` text NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `section` CHANGE `remarks` `remarks` text NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `section` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `order_details` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `order` CHANGE `status` `status` enum ('0', '1', '2', '3', '4', '5') NOT NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `catId` `catId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `image` `image` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `details` `details` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `image` `image` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `details` `details` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `order_details` DROP COLUMN `foodId`");
        await queryRunner.query("ALTER TABLE `order_details` DROP COLUMN `orderId`");
        await queryRunner.query("ALTER TABLE `order_details` ADD `food_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `order_details` ADD `order_id` int NOT NULL");
    }

}
