import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { ChatService } from "../services/chat.service";
import { Chat } from "../entities/chat.entity";
import { CreateChatInput } from "../dto/chat.input";
import { Message } from "../entities/message.entity";
import { MessageService } from "../services/message.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  createChat(@Args("createChatInput") createChatInput: CreateChatInput) {
    return this.chatService.create(createChatInput);
  }

  @Query(() => [Chat], { name: "chats" })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.chatService.findAll();
  }

  @Query(() => Chat, { name: "chat" })
  @UseGuards(JwtAuthGuard)
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.chatService.findOne(id);
  }

  @Query(() => Chat)
  @UseGuards(JwtAuthGuard)
  findByRideId(@Args("rideId", { type: () => String }) rideId: string) {
    return this.chatService.findByRideId(rideId);
  }

  // @Mutation(() => Chat)
  // updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
  //   return this.chatService.update(updateChatInput.id, updateChatInput);
  // }

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  removeChat(@Args("id", { type: () => String }) id: string) {
    return this.chatService.remove(id);
  }

  @ResolveField(() => [Message])
  async messages(@Parent() chat: Chat): Promise<Message[]> {
    if (chat) {
      return await this.messageService.findByChatId(chat.id);
    }
  }
}
