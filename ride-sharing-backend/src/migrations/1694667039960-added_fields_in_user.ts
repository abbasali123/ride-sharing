import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFieldsInUser1694667039960 implements MigrationInterface {
    name = 'AddedFieldsInUser1694667039960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('DRIVER', 'CUSTOMER', 'USER', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
    }

}
