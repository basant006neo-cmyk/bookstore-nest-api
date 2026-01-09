import {
  Get,
  Injectable,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
    private configService : ConfigService
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Your account is blocked by admin');
    }

    const match = await bcrypt.compare(pass, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return {
      user: result,
      access_token: await this.jwtService.signAsync(result, {
        secret: this.configService.get("JWT_SECRET"),
      }),
    };
  }

  async register(name, email, password) {
    const user = await this.userService.create({
      name,
      email,
      password,
    });
    return user;
  }

  validateUser(id) {
    return this.userService.findById(id);
  }
}
