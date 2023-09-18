import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateRideInput, GetAllRideInput } from "../dto/ride.input";
import { Ride } from "../entities/ride.entity";
import { RidesService } from "../services/rides.service";
import { RidePricing } from "../entities/ridePricing.entity";
import { RidePricingService } from "../services/ridePricing.service";
import { VehiclesService } from "../services/vehicles.service";
import { Vehicle } from "../entities/vehicle.entity";
import { PricingTiersService } from "../services/pricingTiers.service";
import { PricingTiers } from "../entities/pricingTiers.entity";

@Resolver(() => RidePricing)
export class RidePricingResolver {
  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly pricingTiersService: PricingTiersService,
    private readonly ridePricingService: RidePricingService
    ) {}


  @ResolveField(() => Vehicle)
  async vehicle(@Parent() ridePricing: RidePricing): Promise<Vehicle> {
    if (ridePricing) {
      return await this.vehicleService.findVehicleById(ridePricing.vehicleId);
    }
  }

  @ResolveField(() => PricingTiers)
  async pricingTiers(@Parent() ridePricing: RidePricing): Promise<PricingTiers> {
    if (ridePricing) {
      return await this.pricingTiersService.findPricingTierById(ridePricing.pricingTiersId);
    }
  }
}
