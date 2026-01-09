import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name : string;

    @ApiProperty()
    @IsEmail()
    email : string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    password : string;
}