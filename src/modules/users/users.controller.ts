import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service'; 
import { UpdateUserDto, UpdateUserStatusDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard'; 
import { JwtAuthGuard } from '../auth/jwt.guard';
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  allUsers() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Patch(':id/status')
  @UseGuards(AdminGuard)
  updateStatus(
    @Param('id') id: number,
    @Body() body: UpdateUserStatusDto,
  ) {
    return this.userService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
