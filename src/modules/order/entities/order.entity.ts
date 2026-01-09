import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from 'src/modules/users/user.entity';

export enum OrderStatus {
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  total: number;

  @Column({  type : 'enum', enum : OrderStatus, default: 'CONFIRMED' })
  status: OrderStatus

  @Column({ default: 'COD' })
  paymentMethod: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;
}
