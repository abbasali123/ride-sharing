import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetAllVehicleInput } from "../dto/vehicle.input";
import { Vehicle } from "../entities/vehicle.entity";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async findByVehicleName(name: string): Promise<Vehicle> {
    return this.vehicleRepository.findOne({ where: { name } });
  }

  findAll(getAllVehicleInput: GetAllVehicleInput): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ where: getAllVehicleInput });
  }

  async findVehicleById(id: string): Promise<Vehicle> {
    return this.vehicleRepository.findOne({ where: { id } });
  }
}
