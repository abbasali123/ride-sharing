import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Vehicle } from "../entities/vehicle.entity";
import { Connection, getManager, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

const vehicleData = [
  {
    name: "Mini",
    description: "Affordable, compact rides without AC",
    iconUrl:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_687,h_386/f_auto,q_auto/products/carousel/UberX.png",
  },
  {
    name: "Auto",
    description: "Auto rickshaws at the tap of a button",
    iconUrl:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_687,h_386/f_auto,q_auto/products/carousel/TukTuk_YellowBlack.png",
  },
  {
    name: "Moto",
    description: "Affordable and quick motorcycle rides",
    iconUrl:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_687,h_386/f_auto,q_auto/products/carousel/Moto.png",
  },
  {
    name: "UberX",
    description: "Premium rides in high-end cars",
    iconUrl:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_687,h_386/f_auto,q_auto/products/carousel/UberX.png",
  },
];

@Injectable()
export class CreateVehicles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add Document Types 
      console.log("vehicleData", vehicleData) 
      await Promise.all(vehicleData.map(async (item) => {
        
        const getVehicle = await getRepository(Vehicle).findOne({ where: {name: item.name} })
        if (!getVehicle) {
          let vehicle = getRepository(Vehicle).create(item)
          vehicle = await queryRunner.manager.save(vehicle);
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
