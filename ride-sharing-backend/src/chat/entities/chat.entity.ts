// src/auth/user.entity.ts
import { Field, ObjectType } from "@nestjs/graphql";
import { Ride } from "src/rides/entities/ride.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Message } from "./message.entity";

@ObjectType("chat")
@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  rideId: string;

  @Field(() => Ride, { nullable: true })
  @OneToOne(() => Ride, (ride) => ride.chat)
  @JoinColumn()
  ride: Ride;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (messages) => messages.chat)
  messages: Message[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
