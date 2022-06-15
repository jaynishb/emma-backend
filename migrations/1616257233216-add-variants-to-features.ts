import {MigrationInterface, QueryRunner} from "typeorm";

export class addVariantsToFeatures1616257233216 implements MigrationInterface {
    name = 'addVariantsToFeatures1616257233216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" ADD "variants" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" DROP COLUMN "variants"`);
    }

}
