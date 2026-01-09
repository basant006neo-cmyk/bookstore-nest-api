import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    default : "basant@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default : "1234"
  })
  @IsNotEmpty()
  password: string;
}
