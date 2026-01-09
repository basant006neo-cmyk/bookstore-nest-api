import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Address } from 'src/modules/address/entities/address.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { OrderItem } from 'src/modules/order/entities/order-item.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/users/user.entity';

export const dbConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.get('DB_HOST'),
  username: config.get('DB_USER'),
  password: config.get('DB_PASS'),
  database: config.get('DB_NAME'),
  //   entities: [User, Book, Order, OrderItem, Address],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
});
