import {MigrationInterface, QueryRunner} from "typeorm";

export class initTableUserAndSection1625124879780 implements MigrationInterface {
    name = 'initTableUserAndSection1625124879780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `section` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `name` varchar(50) NOT NULL, `remarks` text NULL, `leaderId` bigint NOT NULL, `floorNum` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `name` varchar(50) NOT NULL, `sectionId` bigint NOT NULL, `joiningDate` date NOT NULL, `userFlag` enum ('0', '1') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `section`");
    }

}
