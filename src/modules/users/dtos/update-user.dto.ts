import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from '../user.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}



export class UpdateUserStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserStatus)
  status : UserStatus
}