import { MigrationInterface, QueryRunner } from "typeorm";

export class RideAndUserRelation1694762634321 implements MigrationInterface {
    name = 'RideAndUserRelation1694762634321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ADD "distance" character varying`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "driverId" integer`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_d735b5961d843f2af1759b4d6ee" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_d735b5961d843f2af1759b4d6ee"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "driverId"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "distance"`);
    }

}
