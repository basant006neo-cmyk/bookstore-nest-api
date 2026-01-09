import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCK = 'BLOCKED'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({select : false})
  password: string;

  @Column({
    default: 'User',
  })
  role: string;

  @Column({ type : 'enum', enum : UserStatus, default: 'ACTIVE' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
