// src/auth/user.entity.ts
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RidePricing } from "./ridePricing.entity";

@ObjectType("vehicle")
@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(()=>String)
  name: string;

  @Column()
  @Field(()=>String)
  description: string;

  @Column()
  @Field(()=>String)
  iconUrl: string;

  @OneToMany(() => RidePricing, (ridePricing) => ridePricing.vehicle)
  ridePricing: RidePricing[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
