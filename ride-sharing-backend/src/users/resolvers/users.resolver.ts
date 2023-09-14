import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UsersService } from "../services/users.service";
import { User } from "../entities/user.entity";
import { CreateUserInput } from "../dto/create-user.input";
import { UpdateUserInput } from "../dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
