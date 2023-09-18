import { MigrationInterface, QueryRunner } from "typeorm";

export class RidePricingTable1694761121581 implements MigrationInterface {
    name = 'RidePricingTable1694761121581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ride_pricing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rideId" uuid, "vehicleId" uuid, "pricingTiersId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21af8a01253ce8894144b09b752" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride_pricing" ADD CONSTRAINT "FK_09935e2434a3acf66c04287d013" FOREIGN KEY ("rideId") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride_pricing" ADD CONSTRAINT "FK_04b46b5dcdf37694a93eff48c62" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride_pricing" ADD CONSTRAINT "FK_d3ef4d29a770581c4c2517e27b7" FOREIGN KEY ("pricingTiersId") REFERENCES "pricing_tiers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride_pricing" DROP CONSTRAINT "FK_d3ef4d29a770581c4c2517e27b7"`);
        await queryRunner.query(`ALTER TABLE "ride_pricing" DROP CONSTRAINT "FK_04b46b5dcdf37694a93eff48c62"`);
        await queryRunner.query(`ALTER TABLE "ride_pricing" DROP CONSTRAINT "FK_09935e2434a3acf66c04287d013"`);
        await queryRunner.query(`DROP TABLE "ride_pricing"`);
    }

}
