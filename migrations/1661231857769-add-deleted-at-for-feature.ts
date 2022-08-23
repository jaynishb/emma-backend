import {MigrationInterface, QueryRunner} from "typeorm";

export class SddDeletedAtForFeature1661231857769 implements MigrationInterface {
    name = 'addDeletedAtForFeature1661231857769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" DROP COLUMN "deleted_at"`);
    }

}
