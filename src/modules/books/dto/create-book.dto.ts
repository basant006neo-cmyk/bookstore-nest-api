import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

 @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  stock: number;

  @IsOptional()
  image: string; // file upload

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;
}
