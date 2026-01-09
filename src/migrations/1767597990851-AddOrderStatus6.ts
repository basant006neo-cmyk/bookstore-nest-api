import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderStatus61767597990851 implements MigrationInterface {
    name = 'AddOrderStatus61767597990851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`pincode\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
