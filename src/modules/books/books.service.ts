import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  create(createBookDto: any) {
    return this.bookRepo.save(createBookDto);
  }

  findAll() {
    return this.bookRepo.find();
  }

  findOne(id: number) {
    return this.bookRepo.findOneBy({ id });
  }

  async update(id: number, updateBookDto: any) {
    const book = await this.bookRepo.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    Object.assign(book, updateBookDto);
    await this.bookRepo.save(book);

    return book; 
  }

  remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
