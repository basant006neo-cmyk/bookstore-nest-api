import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger'; 
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/modules/users/user.entity'; 
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@CurrentUser() user : User, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(user.id, dto);
  }

  @Get()
  getMyOrders(@CurrentUser() user) {
    return this.orderService.findUserOrders(user.id);
  }

  @UseGuards(AdminGuard)
  @Get('admin')
  getAll() {  
    return this.orderService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number, @CurrentUser() user : User) {
    return this.orderService.findOne(id, user.id);
  }

  @Put(':id/status')
  @UseGuards(AdminGuard)
  update(@Param('id') id: number, @Body() body: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(id, body);
  }
}
