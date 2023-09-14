// src/auth/user.entity.ts
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import Role from "src/enums/roles.enum";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  @Field(() => Role)
  role: Role;
}
