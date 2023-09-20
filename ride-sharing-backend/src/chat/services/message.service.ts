import { Injectable } from "@nestjs/common";
import { CreateMessageInput } from "../dto/message.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "../entities/message.entity";
import { Repository } from "typeorm";
import { RidesService } from "src/rides/services/rides.service";
import { ChatService } from "./chat.service";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatService: ChatService,
  ) {}

  async create(createMessageInput: CreateMessageInput) {
    const { chatId, senderId, content } = createMessageInput || {};
    const chat = await this.chatService.findOne(chatId);
    const messageInstance = this.messageRepository.create({ senderId, content });
    messageInstance.chat = chat;
    messageInstance.chatId = chatId;

    return this.messageRepository.save(messageInstance);
  }

  async findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: string) {
    return this.messageRepository.findOne({ where: { id } });
  }

  async findByChatId(chatId: string) {
    return this.messageRepository.find({ where: { chatId } });
  }

  // update(id: number, updateMessageInput: UpdateMessageInput) {
  //   return `This action updates a #${id} message`;
  // }

 async remove(id: string) {
    return await this.messageRepository.delete(id);
  }
}
