import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() body: LoginDto) {
    return this.authService.signIn(body.email, body.password)
  }

  @Public()
  @Post("register")
  register(@Body() body : RegisterDto) {
    return this.authService.register(body.name, body.email, body.password)
  }


  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user) {
    return user;
  }

}
