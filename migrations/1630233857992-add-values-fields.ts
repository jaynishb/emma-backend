import {MigrationInterface, QueryRunner} from "typeorm";

export class addValuesFields1630233857992 implements MigrationInterface {
    name = 'addValuesFields1630233857992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" ADD "values" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" DROP COLUMN "values"`);
    }

}
