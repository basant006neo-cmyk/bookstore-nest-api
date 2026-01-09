import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth('access-token')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        author: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = Date.now() + '-' + file.originalname;
          cb(null, name);
        },
      }),
    }),
  )
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Book image is required');
    }
    return this.booksService.create({
      ...createBookDto,
      image: file?.filename,
    });
  }

  @Public()
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        author: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = Date.now() + '-' + file.originalname;
          cb(null, name);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) updateBookDto.image = file.filename;
    return this.booksService.update(id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(+id);
  }
}
