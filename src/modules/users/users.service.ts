import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user: CreateUserDto) {
    const checkUser = await this.findByEmail(user.email);
    if (checkUser) {
      throw new ConflictException('Email is already Exist');
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.repo.save(user);
  }

  async createUser(dto: CreateUserDto) {
    return this.create(dto);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.repo.findOne({
        where: { email: dto.email },
      });

      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }
    }

    Object.assign(user, dto);
    return this.repo.save(user);
  }

  updateStatus(id: number, status: 'ACTIVE' | 'BLOCKED') {
    return this.repo.update(id, { status });
  }

  findAll() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    return this.repo.findOne({
      select: ['id', 'email', 'name', 'role', 'password', 'status'],
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    const user = await this.repo.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.repo.remove(user);
  }
}
