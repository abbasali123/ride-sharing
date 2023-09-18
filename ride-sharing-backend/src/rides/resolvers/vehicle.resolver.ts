import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetAllVehicleInput } from "../dto/vehicle.input";
import { Vehicle } from "../entities/vehicle.entity";
import { VehiclesService } from "../services/vehicles.service";

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  @UseGuards(JwtAuthGuard)
  findAllVehicles(@Args('getAllVehicleInput', { nullable: true }) getAllVehicleInput: GetAllVehicleInput) {
    return this.vehiclesService.findAll(getAllVehicleInput);
  }
}
