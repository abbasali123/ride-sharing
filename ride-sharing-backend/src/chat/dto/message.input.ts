import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  chatId: string;

  @Field(() => String)
  senderId: string;

  @Field(() => String)
  content: string;
}