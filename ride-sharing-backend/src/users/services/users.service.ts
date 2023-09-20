import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserInput } from "../dto/create-user.input";
import { UpdateUserInput } from "../dto/update-user.input";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ username }, { email: username }] });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { password } = createUserInput || {};
    const hashedPassword = await this.hashPassword(password);

    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === "23505") {
        // Unique constraint violation (e.g., duplicate username or email)
        throw new ConflictException("Username or email already exists");
      }
      throw error;
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the number of salt rounds for security
    return bcrypt.hash(password, saltRounds);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new InternalServerErrorException("User not found");
    }

    const updatedUser = this.userRepository.save({
      ...user, // existing fields
      ...updateUserInput, // updated fields
    });

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new InternalServerErrorException("User not found");
    }

    const removedUser = this.userRepository.remove(user);
    return removedUser;
  }
}
