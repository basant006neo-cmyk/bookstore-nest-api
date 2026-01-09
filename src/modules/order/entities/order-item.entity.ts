import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Book } from "src/modules/books/entities/book.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete : 'CASCADE' })
    order : Order

    @ManyToOne(() => Book)
    book : Book;

    @Column()
    quantity : number;

    @Column()
    price : number;
}