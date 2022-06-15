import {MigrationInterface, QueryRunner} from "typeorm";

export class addRulesInRuleset1614535811523 implements MigrationInterface {
    name = 'addRulesInRuleset1614535811523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rule-sets" ADD "rules" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rule-sets" DROP COLUMN "rules"`);
    }

}
