import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Enhancer, GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RidesModule } from "./rides/rides.module";
import typeorm from "./config/typeorm";
import { join } from "path";
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get("typeorm"),
    }),

    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       debug: true,
    //       playground: true,
    //       autoSchemaFile: "schema.gql",
    //       sortSchema: true,
    //       fieldResolverEnhancers: ["interceptors"] as Enhancer[],
    //       autoTransformHttpErrors: true,
    //       context: (context) => context,
    //       subscriptions: {
    //         'graphql-ws': true,
    //       },
    //       installSubscriptionHandlers: true,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path:"/graphql"
        }
      },
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: 'schema.gql',
    //   subscriptions: {
    //     'graphql-ws': true,
    //   },
    //   // transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
    //   // installSubscriptionHandlers: true,
    //   // buildSchemaOptions: {
    //   //   directives: [
    //   //     new GraphQLDirective({
    //   //       name: 'upper',
    //   //       locations: [DirectiveLocation.FIELD_DEFINITION],
    //   //     }),
    //   //   ],
    //   // },

    // }),
    UsersModule,
    AuthModule,
    RidesModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
