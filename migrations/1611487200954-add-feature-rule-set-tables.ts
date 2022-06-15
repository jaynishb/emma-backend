import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFeatureRuleSetTables1611487200954
    implements MigrationInterface {
    name = 'addFeatureRuleSetTables1611487200954';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "rule-sets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_id" uuid, CONSTRAINT "PK_2d15f13111f1f015317c9813815" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "features" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "feature_key" character varying NOT NULL, "description" character varying, "enabled" boolean NOT NULL DEFAULT false, "tags" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ruleset_id" uuid, "created_by_id" uuid, CONSTRAINT "UQ_91a77e59b9dcba9b635d9054f08" UNIQUE ("feature_key"), CONSTRAINT "PK_5c1e336df2f4a7051e5bf08a941" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "rule-sets" ADD CONSTRAINT "FK_7383a5645e9f76d049f901ba1c7" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "features" ADD CONSTRAINT "FK_009b1257fe7fe510d0efadd9ce8" FOREIGN KEY ("ruleset_id") REFERENCES "rule-sets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "features" ADD CONSTRAINT "FK_112900b46aa94e7c5a2bf1db66d" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "features" DROP CONSTRAINT "FK_112900b46aa94e7c5a2bf1db66d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "features" DROP CONSTRAINT "FK_009b1257fe7fe510d0efadd9ce8"`,
        );
        await queryRunner.query(
            `ALTER TABLE "rule-sets" DROP CONSTRAINT "FK_7383a5645e9f76d049f901ba1c7"`,
        );
        await queryRunner.query(`DROP TABLE "features"`);
        await queryRunner.query(`DROP TABLE "rule-sets"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
