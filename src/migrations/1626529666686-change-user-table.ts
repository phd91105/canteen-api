import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUserTable1626529666686 implements MigrationInterface {
    name = 'changeUserTable1626529666686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `details` `details` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `image` `image` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `details` `details` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `image` `image` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `food` CHANGE `catId` `catId` int NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `order_details` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `section` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `section` CHANGE `remarks` `remarks` text NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `section` CHANGE `remarks` `remarks` text NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `section` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `order_details` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `order` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `catId` `catId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `image` `image` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `details` `details` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `food` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `image` `image` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `details` `details` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
    }

}
