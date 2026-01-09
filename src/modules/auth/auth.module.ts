import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
        global: true,
      }),
    }),
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log(`[Auth Module] initialized`);
    
  }

  onModuleDestroy() {
     console.log(`[Auth Module] destroyed`);
  }
}
