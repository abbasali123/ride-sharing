import { InputType, Int, Field } from '@nestjs/graphql';
import Role from 'src/enums/roles.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => Role, { nullable: true, defaultValue: Role.USER })
  role: Role;
}
