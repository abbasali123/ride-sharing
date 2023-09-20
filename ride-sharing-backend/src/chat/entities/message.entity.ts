// src/auth/user.entity.ts
import { Field, ObjectType } from "@nestjs/graphql";
import { Ride } from "src/rides/entities/ride.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Chat } from "./chat.entity";

@ObjectType("message")
@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  content: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  senderId: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  chatId: string;

  @Field(() => Chat, { nullable: true })
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
