import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingFeedbackColumnsInRide1694764580732 implements MigrationInterface {
    name = 'AddingFeedbackColumnsInRide1694764580732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ADD "pickupNotes" character varying`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "feedback" character varying`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "rating" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "feedback"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "pickupNotes"`);
    }

}
