import { Injectable } from "@nestjs/common";
import { CreateChatInput } from "../dto/chat.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "../entities/chat.entity";
import { Repository } from "typeorm";
import { RidesService } from "src/rides/services/rides.service";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly ridesService: RidesService,
  ) {}

  async create(createChatInput: CreateChatInput) {
    const { rideId } = createChatInput || {};
    const ride = await this.ridesService.findOne(rideId);
    const chatInstance = this.chatRepository.create();
    chatInstance.ride = ride;
    chatInstance.rideId = rideId;

    return this.chatRepository.save(chatInstance);
  }

  async findAll() {
    return this.chatRepository.find();
  }

  async findOne(id: string) {
    return this.chatRepository.findOne({ where: { id } });
  }

  async findByRideId(rideId: string) {
    return this.chatRepository.findOne({ where: { rideId } });
  }

  // update(id: number, updateChatInput: UpdateChatInput) {
  //   return `This action updates a #${id} chat`;
  // }

 async remove(id: string) {
    return await this.chatRepository.delete(id);
  }
}
