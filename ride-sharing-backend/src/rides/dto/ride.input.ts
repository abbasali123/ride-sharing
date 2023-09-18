import { Field, InputType, Int } from "@nestjs/graphql";
import { RIDE_STATUS } from "../entities/ride.entity";

@InputType()
export class GetAllRideInput {
  @Field(() => String, { nullable: true })
  id?: string;
}

@InputType()
export class CreateRideInput {
  @Field(() => String)
  originLat: string;

  @Field(() => String)
  originLong: string;

  @Field(() => String)
  destinationLat: string;

  @Field(() => String)
  destinationLong: string;

  @Field(() => String)
  departureTime: string;

  @Field(() => String, { nullable: true })
  distance?: string;

  @Field(() => RIDE_STATUS, { nullable: true, defaultValue: RIDE_STATUS.SCHEDULED })
  status: RIDE_STATUS;

  @Field(() => String)
  vehicleId: string;

  @Field(() => String)
  pricingTiersId: string;

  @Field(() => String)
  time: string;

  @Field(() => Int)
  customerId: number;
}

@InputType()
export class FeedbackInput {
  @Field(() => String)
  rideId: string;

  @Field(() => Int)
  rating: number;

  @Field(() => String)
  feedback: string;
}

@InputType()
export class AcceptRideInput {
  @Field(() => String)
  rideId: string;

  @Field(() => Int)
  driverId: number;
}
