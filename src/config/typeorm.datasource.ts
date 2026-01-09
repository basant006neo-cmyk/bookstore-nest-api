import { config } from 'dotenv';
import { Address } from 'src/modules/address/entities/address.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { OrderItem } from 'src/modules/order/entities/order-item.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/users/user.entity';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  // entities: [User, Book, Order, OrderItem, Address],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
