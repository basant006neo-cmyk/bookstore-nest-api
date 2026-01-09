import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderStatus81767612187268 implements MigrationInterface {
    name = 'AddOrderStatus81767612187268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

}
