import {MigrationInterface, QueryRunner} from "typeorm";

export class addRulesToFeature1619173280129 implements MigrationInterface {
    name = 'addRulesToFeature1619173280129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" ADD "rules" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" DROP COLUMN "rules"`);
    }

}
