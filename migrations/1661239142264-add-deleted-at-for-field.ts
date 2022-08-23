import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeletedAtForField1661239142264 implements MigrationInterface {
    name = 'addDeletedAtForField1661239142264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fields" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fields" DROP COLUMN "deleted_at"`);
    }

}
