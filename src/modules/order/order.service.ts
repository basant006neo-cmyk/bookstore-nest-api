import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/users/user.entity';
import { EmailService } from './email.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    // @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    // @InjectRepository(Book) private bookRepo: Repository<Book>,
    private dataSource: DataSource,
    private emailService: EmailService,
  ) {}

  // async createOrder(userId: number, dto: CreateOrderDto) {
  //   let total = 0;
  //   const items: OrderItem[] = [];

  //   for (const i of dto.items) {
  //     const book = await this.bookRepo.findOneBy({ id: i.bookId });
  //     if (!book) throw new NotFoundException('Book not found');

  //     total += book.price * i.quantity;

  //     const item = new OrderItem();
  //     item.book = book;
  //     item.quantity = i.quantity;
  //     item.price = book.price;

  //     items.push(item);
  //   }

  //   const order = new Order();
  //   order.user = { id: userId } as User;
  //   order.orderItems = items;
  //   order.total = total;

  //   const savedOrder = await this.orderRepo.save(order);
  //   this.emailService.sendOrderEmail(savedOrder)

  //   return savedOrder
  // }

  async createOrder(userId: number, dto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const bookRepository = queryRunner.manager.getRepository(Book);
      const orderRepository = queryRunner.manager.getRepository(Order);
      let total = 0;

      const items: OrderItem[] = [];

      for (const i of dto.items) {
        const book = await bookRepository.findOneBy({ id: i.bookId });
        if (!book) throw new NotFoundException('Book not found');

        if (book.stock <= 0) {
          throw new ConflictException('Out of stock');
        }

        total += book.price * i.quantity;

        const item = new OrderItem();
        item.book = book;
        item.quantity = i.quantity;
        item.price = book.price;

        items.push(item);
      }

      const order = new Order();
      order.user = { id: userId } as User;
      order.orderItems = items;
      order.total = total; 

      const savedOrder = await orderRepository.save(order);

      await queryRunner.commitTransaction();

      this.emailService.sendOrderEmail(savedOrder);

      return savedOrder;
    } catch (error) {
      console.log(error);

      await queryRunner.rollbackTransaction();
      // throw error;
      throw new ConflictException('Order Failed Please Try again later');
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(orderId: number, userId: number) {
    return this.orderRepo.findOne({
      where: {
        id: orderId,
        user: { id: userId },
      },
      relations: ['orderItems', 'orderItems.book'],
    });
  }

  findUserOrders(userId: number) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['orderItems', 'orderItems.book'],
    });
  }

  findAll() {
    return this.orderRepo.find({
      relations: ['user', 'orderItems', 'orderItems.book'],
    });
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    Object.assign(order, dto);
    await this.orderRepo.save(order);

    return order;
  }
}
