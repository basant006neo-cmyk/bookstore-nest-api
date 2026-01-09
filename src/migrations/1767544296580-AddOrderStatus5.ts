import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderStatus51767544296580 implements MigrationInterface {
    name = 'AddOrderStatus51767544296580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`image\` \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
