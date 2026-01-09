import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderStatus31767340026595 implements MigrationInterface {
    name = 'AddOrderStatus31767340026595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_15605eba0be4c6669389090dd15\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_15605eba0be4c6669389090dd15\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
    }

}
