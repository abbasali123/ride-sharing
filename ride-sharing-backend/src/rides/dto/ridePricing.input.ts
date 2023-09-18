import { Field, InputType } from "@nestjs/graphql";
import { RIDE_STATUS } from "../entities/ride.entity";

@InputType()
export class CreateRidePricingInput {
  @Field(() => String)
  vehicleId: string;

  @Field(() => String)
  pricingTiersId: string;

  @Field(()=>String)
  rideId: string
}
