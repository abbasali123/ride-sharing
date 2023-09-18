import { MigrationInterface, QueryRunner } from "typeorm";

export class RidesTable1694671137466 implements MigrationInterface {
    name = 'RidesTable1694671137466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ride_status_enum" AS ENUM('scheduled', 'in progress', 'completed', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "origin" character varying NOT NULL, "destination" character varying NOT NULL, "departureTime" character varying NOT NULL, "availableSeats" character varying, "price" character varying NOT NULL, "status" "public"."ride_status_enum" NOT NULL DEFAULT 'scheduled', "passengers" character varying, "rideCode" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TYPE "public"."ride_status_enum"`);
    }

}
