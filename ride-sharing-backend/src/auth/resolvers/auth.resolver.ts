// src/auth/auth.resolver.ts
import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { AuthService } from "../services/auth.service";
import { LoginObject } from "../dto/login.input";

@Resolver("Auth")
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => LoginObject)
  async login(
    @Args("username") username: string,
    @Args("password") password: string,
  ): Promise<LoginObject> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return this.authService.login(user);
  }
}
