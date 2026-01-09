import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto {

    @ApiProperty()
    @IsNotEmpty({message : "Username is required"})
    @IsString()
    name : string;

    @ApiProperty()
    @IsEmail()
    email : string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4, { message : "Password should be minimum 4 character" })
    password : string;
}