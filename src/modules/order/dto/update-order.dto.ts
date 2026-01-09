import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../entities/order.entity';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class UpdateOrderStatusDto {
    @ApiProperty()
    @IsEnum(OrderStatus)
    status : OrderStatus
}
