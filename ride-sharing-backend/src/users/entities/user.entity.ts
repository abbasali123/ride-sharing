// src/auth/user.entity.ts
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import Role from "../../enums/roles.enum";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ride } from "src/rides/entities/ride.entity";

registerEnumType(Role, {
  name: "userRoles",
  description: "The supported roles.",
});

@ObjectType("users")
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field()
  first_name: string;

  @Column({ nullable: true })
  @Field()
  last_name: string;

  @OneToMany(() => Ride, (customerRides) => customerRides.customer, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Ride], { nullable: true })
  customerRides: Ride[];

  @OneToMany(() => Ride, (driverRides) => driverRides.driver, { onUpdate: 'CASCADE', onDelete: "CASCADE" })
  @Field(type => [Ride], { nullable: true })
  driverRides: Ride[];

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  @Field(() => Role)
  role: Role;
}
