import { Module } from '@nestjs/common';
import { RidesService } from './services/rides.service';
import { RidesResolver } from './resolvers/rides.resolver';

@Module({
  providers: [RidesResolver, RidesService],
})
export class RidesModule {}
