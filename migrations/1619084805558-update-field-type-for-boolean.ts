import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFieldTypeForBoolean1619084805558
    implements MigrationInterface {
    name = 'updateFieldTypeForBoolean1619084805558';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TYPE "public"."fields_type_enum" RENAME TO "fields_type_enum_old"`,
        );
        await queryRunner.query(
            `CREATE TYPE "fields_type_enum" AS ENUM('STRING', 'ARRAY', 'BOOLEAN', 'NUMBER', 'DATE')`,
        );
        await queryRunner.query(
            `ALTER TABLE "fields" ALTER COLUMN "type" DROP DEFAULT`,
        );
        await queryRunner.query(
            `ALTER TABLE "fields" ALTER COLUMN "type" TYPE "fields_type_enum" USING "type"::"text"::"fields_type_enum"`,
        );
        await queryRunner.query(
            `ALTER TABLE "fields" ALTER COLUMN "type" SET DEFAULT 'STRING'`,
        );
        await queryRunner.query(`DROP TYPE "fields_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "fields_type_enum_old" AS ENUM('STRING', 'ARRAY', 'boolean', 'NUMBER', 'DATE')`,
        );
        await queryRunner.query(
            `ALTER TABLE "fields" ALTER COLUMN "type" DROP DEFAULT`,
        );
        await queryRunner.query(
            `ALTER TABLE "fields" ALTER COLUMN "type" TYPE "fields_type_enum_old" USING "type"::"text"::"fields_type_enum_old"`,
        );
        await queryRunner.query(
            `ALTER TABLE "fields" ALTER COLUMN "type" SET DEFAULT 'STRING'`,
        );
        await queryRunner.query(`DROP TYPE "fields_type_enum"`);
        await queryRunner.query(
            `ALTER TYPE "fields_type_enum_old" RENAME TO  "fields_type_enum"`,
        );
    }
}
