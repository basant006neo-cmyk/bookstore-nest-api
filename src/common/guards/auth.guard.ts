import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    private configService : ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) { 
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>(); 

    const token = this.extractTokenFromHeader(request);  

    if (!token) {
      throw new UnauthorizedException();
    }

    try { 
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("JWT_SECRET")
      });  

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromHeader(request: Request): any {
    const authHeader = request.headers['authorization'];

    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
