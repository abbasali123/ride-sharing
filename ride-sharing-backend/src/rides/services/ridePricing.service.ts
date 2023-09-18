import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RidePricing } from "../entities/ridePricing.entity";
import { CreateRidePricingInput } from "../dto/ridePricing.input";
import { VehiclesService } from "./vehicles.service";
import { PricingTiersService } from "./pricingTiers.service";

@Injectable()
export class RidePricingService {
  constructor(
    @InjectRepository(RidePricing)
    private readonly ridePricingRepository: Repository<RidePricing>,
    private readonly vehiclesService: VehiclesService,
    private readonly pricingTiersService: PricingTiersService,
  ) {}

  async create(createRidePricingInput:CreateRidePricingInput){
    const { pricingTiersId, rideId, vehicleId }= createRidePricingInput || {}
    const vehicle = await this.vehiclesService.findVehicleById(vehicleId);
    const pricingTier = await this.pricingTiersService.findPricingTierById(pricingTiersId);

    const ridePricingInstance= await this.ridePricingRepository.create({ rideId })
    ridePricingInstance.pricingTiers= pricingTier
    ridePricingInstance.pricingTiersId= pricingTiersId

    ridePricingInstance.vehicle= vehicle
    ridePricingInstance.vehicleId= vehicleId

    return this.ridePricingRepository.save(ridePricingInstance)
  }

  async getRidingPriceByRide(rideId: string){
    return this.ridePricingRepository.find({ where: { rideId } })
  }
}
