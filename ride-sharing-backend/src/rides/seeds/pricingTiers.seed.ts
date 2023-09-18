import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Vehicle } from "../entities/vehicle.entity";
import { Connection, getManager, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { PricingTiers } from "../entities/pricingTiers.entity";

const pricingTiersData = [
  {
    name: "Economy",
    description: "Economy",
    basePrice: '10',
    perMileRate: '5',
    perMinuteRate: '5'
  },
  {
    name: "Premium",
    description: "Premium",
    basePrice: '15',
    perMileRate: '10',
    perMinuteRate: '10'
  },
  {
    name: "VIP",
    description: "VIP",
    basePrice: '20',
    perMileRate: '15',
    perMinuteRate: '15'
  },
];

@Injectable()
export class CreatePricingTiers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(pricingTiersData.map(async (item) => {
        
        const getPricingTier = await getRepository(PricingTiers).findOne({ where: {name: item.name} })
        if (!getPricingTier) {
          let pricingTier = getRepository(PricingTiers).create(item)
          pricingTier = await queryRunner.manager.save(pricingTier);
        }
      }))
      await queryRunner.commitTransaction();
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
