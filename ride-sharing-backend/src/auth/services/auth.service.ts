// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { LoginObject } from '../dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    const isPasswordMatched=bcrypt.compareSync(password, user.password)

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginObject> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user
    };
  }
}
