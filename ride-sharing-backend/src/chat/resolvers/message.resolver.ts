import { Resolver, Query, Mutation, Args, Int, Subscription, ID } from "@nestjs/graphql";
import { MessageService } from "../services/message.service";
import { Message } from "../entities/message.entity";
import { CreateMessageInput } from "../dto/message.input";
import { PubsubService } from "../services/pubsub.service";
import { ChatService } from "../services/chat.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PubSub } from "graphql-subscriptions";

const pubSub= new PubSub()

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    private readonly _pubSubService: PubsubService,
  ) {}

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async createMessage(@Args("createMessageInput") createMessageInput: CreateMessageInput) {
     const message= await this.messageService.create(createMessageInput);

     pubSub.publish('newMessage', message)
     
     return message
  }

  @Query(() => [Message], { name: "messages" })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.messageService.findAll();
  }

  @Query(() => Message, { name: "message" })
  @UseGuards(JwtAuthGuard)
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.messageService.findOne(id);
  }

  @Query(() => [Message])
  @UseGuards(JwtAuthGuard)
  findByChatId(@Args("chatId", { type: () => String }) chatId: string) {
    return this.messageService.findByChatId(chatId);
  }

  // @Mutation(() => Message)
  // updateMessage(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput) {
  //   return this.messageService.update(updateMessageInput.id, updateMessageInput);
  // }

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  removeMessage(@Args("id", { type: () => String }) id: string) {
    return this.messageService.remove(id);
  }

  @Subscription(() => Message, {
    filter: async (newMessage: Message, variables: { chatId: string }) => {
      return newMessage.chatId === variables.chatId;
    },
    resolve: (payload: Message) => payload,
  })
  public onNewMessageSent(
    @Args('chatId', { type: () => String }) chatId: string
  ) {
    return pubSub.asyncIterator('newMessage')
  }
}
