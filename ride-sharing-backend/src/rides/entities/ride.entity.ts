// src/auth/user.entity.ts
import { Field, ObjectType } from "@nestjs/graphql";
import Role from "src/enums/roles.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType("ride")
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column(()=>String)
  @Field(()=>String)
  origin: string;

  @Column(()=>String)
  @Field(()=>String)
  destination: string;

  @Column(()=>String)
  @Field(()=>String)
  departureTime: string;

  @Column(()=>String)
  @Field(()=>String)
  availableSeats: string;

  @Column(()=>String)
  @Field(()=>String)
  price: string;

  @Column(()=>String)
  @Field(()=>String)
  status: string;

  @Column(()=>String)
  @Field(()=>String)
  passengers: string;

  @Column(()=>String)
  @Field(()=>String)
  rideCode: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
