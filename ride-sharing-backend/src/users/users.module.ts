import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersResolver } from "./resolvers/users.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { RidesModule } from "src/rides/rides.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(()=>RidesModule)
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService, UsersResolver]
})
export class UsersModule {}
