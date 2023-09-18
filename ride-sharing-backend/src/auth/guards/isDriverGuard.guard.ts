import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import Role from 'src/enums/roles.enum';

@Injectable()
export class IsDriverGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user; // Assuming you have a user object in the request

    // Check if the user is a driver (you may have your own logic here)
    const isDriver = user && user.role === Role.DRIVER;

    return isDriver;
  }
}