import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/modules/users/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const user = request.user;

    console.log(`-----------------`, user);

    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access only');
    }

    return true;
  }
}
