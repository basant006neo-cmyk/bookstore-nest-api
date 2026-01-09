import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/users/user.entity';  
import { AuthModule } from '../auth/auth.module';
import { EmailService } from './email.service';

@Module({
  imports : [TypeOrmModule.forFeature([Order, OrderItem, Book, User]), AuthModule],
  controllers: [OrderController],
  providers: [OrderService, EmailService],
})
export class OrderModule {}
