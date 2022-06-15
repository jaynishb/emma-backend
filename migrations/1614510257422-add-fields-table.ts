import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldsTable1614510257422 implements MigrationInterface {
    name = 'addFieldsTable1614510257422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "fields_type_enum" AS ENUM('STRING', 'ARRAY', 'boolean', 'NUMBER', 'DATE')`);
        await queryRunner.query(`CREATE TABLE "fields" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "type" "fields_type_enum" NOT NULL DEFAULT 'STRING', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_id" uuid, CONSTRAINT "PK_ee7a215c6cd77a59e2cb3b59d41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fields" ADD CONSTRAINT "FK_356c978eac56a6eafa8b5e1f722" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fields" DROP CONSTRAINT "FK_356c978eac56a6eafa8b5e1f722"`);
        await queryRunner.query(`DROP TABLE "fields"`);
        await queryRunner.query(`DROP TYPE "fields_type_enum"`);
    }

}
