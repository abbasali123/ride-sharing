import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateChatInput {
  @Field(() => String)
  rideId: string;
}