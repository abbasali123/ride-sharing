// src/auth/user.entity.ts
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RidePricing } from "./ridePricing.entity";

@ObjectType("pricingTiers")
@Entity()
export class PricingTiers {
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
  basePrice: string;

  @Column()
  @Field(()=>String)
  perMileRate: string;

  @Column()
  @Field(()=>String)
  perMinuteRate: string;

  @OneToMany(() => RidePricing, (ridePricing) => ridePricing.pricingTiers)
  ridePricing: RidePricing[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
