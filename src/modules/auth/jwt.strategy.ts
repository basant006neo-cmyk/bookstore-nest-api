import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(private authService: AuthService) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     secretOrKey: 'test',
  //   });
  // }

  // async validate(payload): Promise<JwtUserDto | null> {
  //   const user = await this.authService.validateUser(payload.id);
  //   if (user) { 
  //     return {
  //       id: payload.id,
  //       email: payload.email,
  //     };
  //   }

  //   return null;
  // }


  constructor(public config : ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return payload;   
  }
}
