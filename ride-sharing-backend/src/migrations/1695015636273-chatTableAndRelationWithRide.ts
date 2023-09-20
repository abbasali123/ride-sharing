import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatTableAndRelationWithRide1695015636273 implements MigrationInterface {
    name = 'ChatTableAndRelationWithRide1695015636273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rideId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_a6832a3049419b2e227ffac3d1" UNIQUE ("rideId"), CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_a6832a3049419b2e227ffac3d18" FOREIGN KEY ("rideId") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_a6832a3049419b2e227ffac3d18"`);
        await queryRunner.query(`DROP TABLE "chat"`);
    }

}
