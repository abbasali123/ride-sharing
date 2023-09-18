import { Module, forwardRef } from '@nestjs/common';
import { RidesService } from './services/rides.service';
import { RidesResolver } from './resolvers/rides.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Vehicle } from './entities/vehicle.entity';
import { PricingTiers } from './entities/pricingTiers.entity';
import { RidePricing } from './entities/ridePricing.entity';
import { VehiclesResolver } from './resolvers/vehicle.resolver';
import { VehiclesService } from './services/vehicles.service';
import { PricingTiersService } from './services/pricingTiers.service';
import { RidePricingService } from './services/ridePricing.service';
import { RidePricingResolver } from './resolvers/ridePricing.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ride, Vehicle, PricingTiers, RidePricing]),
    forwardRef(()=> UsersModule)
  ],
  providers: [RidesResolver, RidesService, VehiclesResolver, VehiclesService, PricingTiersService, RidePricingService, RidePricingResolver],
  exports: [RidesService]
})
export class RidesModule {}
