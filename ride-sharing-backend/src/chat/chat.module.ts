import { Module } from "@nestjs/common";
import { ChatService } from "./services/chat.service";
import { ChatResolver } from "./resolvers/chat.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { Message } from "./entities/message.entity";
import { RidesModule } from "src/rides/rides.module";
import { MessageResolver } from "./resolvers/message.resolver";
import { MessageService } from "./services/message.service";
import { PubSub } from "graphql-subscriptions";
import { PubsubService } from "./services/pubsub.service";

export const PUB_SUB: symbol = Symbol('PUB_SUB')

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), RidesModule],
  providers: [
    ChatResolver,
    ChatService,
    MessageResolver,
    MessageService,
    {
      provide: PUB_SUB,
      useFactory: () => {
        return new PubSub();
      },
      inject: [],
    },
    {
      provide: PubsubService,
      useFactory: (pubsub) => pubsub,
      inject: [PUB_SUB],
    },
  ],
})
export class ChatModule {}
