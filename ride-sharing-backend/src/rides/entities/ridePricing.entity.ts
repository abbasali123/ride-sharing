// src/auth/user.entity.ts
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ride } from "./ride.entity";
import { Vehicle } from "./vehicle.entity";
import { PricingTiers } from "./pricingTiers.entity";

@ObjectType("ridePricing")
@Entity()
export class RidePricing {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Ride, (ride) => ride.ridePricing, { nullable: true })
  @Field(() => Ride, { nullable: true })
  ride: Ride;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.ridePricing)
  vehicle: Vehicle;

  @ManyToOne(() => PricingTiers, (pricingTiers) => pricingTiers.ridePricing)
  pricingTiers: PricingTiers;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  rideId: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  vehicleId: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  pricingTiersId: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
