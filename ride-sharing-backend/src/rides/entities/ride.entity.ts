// src/auth/user.entity.ts
import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { RidePricing } from "./ridePricing.entity";
import { User } from "src/users/entities/user.entity";
import { Chat } from "src/chat/entities/chat.entity";

export enum RIDE_STATUS {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in progress",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

registerEnumType(RIDE_STATUS, {
  name: "rideStatus",
  description: "The supported ride status.",
});

@ObjectType("ride")
@Entity()
export class Ride {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Field(() => String)
  origin: string;

  @Column()
  @Field(() => String)
  destination: string;

  @Column()
  @Field(() => String)
  departureTime: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  distance: string;

  @Column({ nullable: true })
  @Field(() => String)
  availableSeats: string;

  @Column()
  @Field(() => String)
  price: string;

  @Column({
    type: "enum",
    enum: RIDE_STATUS,
    default: RIDE_STATUS.SCHEDULED,
  })
  @Field(() => RIDE_STATUS)
  status: RIDE_STATUS;

  @Column({ nullable: true })
  @Field(() => String)
  passengers: string;

  @Column({ nullable: true })
  @Field(() => String)
  rideCode: string;

  @Column({ nullable: true })
  @Field(() => String)
  pickupNotes: string;

  @Column({ nullable: true })
  @Field(() => String)
  feedback: string;

  @Column({ nullable: true })
  @Field(() => Int)
  rating: number;

  @OneToMany(() => RidePricing, (ridePricing) => ridePricing.ride)
  ridePricing: RidePricing[];

  @ManyToOne(() => User, (user) => user.customerRides, { onDelete: 'CASCADE' })
  @Field(() => User, { nullable: true })
  customer: User;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  customerId: string;

  @ManyToOne(() => User, (user) => user.driverRides, { onDelete: 'CASCADE' })
  @Field(() => User, { nullable: true })
  driver: User;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  driverId: string;

  @Field(() => Chat, { nullable: true })
  @OneToOne(() => Chat, (chat) => chat.ride)
  chat: Chat;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
