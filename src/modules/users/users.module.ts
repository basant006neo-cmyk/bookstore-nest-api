import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  controllers : [UsersController],
  imports : [TypeOrmModule.forFeature([User])],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
