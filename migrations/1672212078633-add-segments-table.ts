import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSegmentsTable1672212078633 implements MigrationInterface {
    name = 'addSegmentsTable1672212078633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "segments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, "filter_rules" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_beff1eec19679fe8ad4f291f04e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "segments"`);
    }

}
