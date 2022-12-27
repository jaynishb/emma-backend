import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomAttributeTable1672047159994 implements MigrationInterface {
    name = 'addCustomAttributeTable1672047159994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customAttribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying, "value" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9fc1d38bad91a321e0e7a835399" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customAttribute"`);
    }

}
