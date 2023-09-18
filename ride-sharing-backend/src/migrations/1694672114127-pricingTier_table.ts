import { MigrationInterface, QueryRunner } from "typeorm";

export class PricingTierTable1694672114127 implements MigrationInterface {
    name = 'PricingTierTable1694672114127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pricing_tiers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "basePrice" character varying NOT NULL, "perMileRate" character varying NOT NULL, "perMinuteRate" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f5f75ade45fc37142b2cdbaa2f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pricing_tiers"`);
    }

}
