import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderStatus41767451422979 implements MigrationInterface {
    name = 'AddOrderStatus41767451422979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`image\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`image\``);
    }

}
