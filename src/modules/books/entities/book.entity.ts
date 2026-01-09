import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({
    nullable: true,
  })
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
