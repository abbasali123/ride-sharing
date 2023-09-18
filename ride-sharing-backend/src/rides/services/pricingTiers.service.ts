import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PricingTiers } from "../entities/pricingTiers.entity";

@Injectable()
export class PricingTiersService {
  constructor(
    @InjectRepository(PricingTiers)
    private readonly vehicleRepository: Repository<PricingTiers>,
  ) {}

  async findByPricingTierName(name: string): Promise<PricingTiers> {
    return this.vehicleRepository.findOne({ where: { name } });
  }

  findAll(): Promise<PricingTiers[]> {
    return this.vehicleRepository.find();
  }

  async findPricingTierById(id: string): Promise<PricingTiers> {
    return this.vehicleRepository.findOne({ where: { id } });
  }
}
