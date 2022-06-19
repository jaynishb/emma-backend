import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDeletedAtForFeature1655626957603 implements MigrationInterface {
    name = 'addDeletedAtForFeature1655626957603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "features" DROP COLUMN "deleted_at"`);
    }

}
