import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BooksService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('BooksService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Database Connected')
  }

  create(createBookDto: CreateBookDto) {
    return this.book.create({
      data: createBookDto
    })
  }


  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto

    const totalPages = await this.book.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.book.findMany({
        where: { available: true },
        skip: (page - 1) * limit,
        take: limit
      }),
      metadata: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(isbn: string) {
    const book = await this.book.findUnique({
      where: { isbn, available: true }
    })

    if (!book) {
      throw new NotFoundException(`Bookt wit isbn ${isbn} not found`)
    }

    return book
  }

  async update(isbn: string, updateBookDto: UpdateBookDto) {
    await this.findOne(isbn)

    return this.book.update({
      where: { isbn },
      data: updateBookDto
    })
  }

  async remove(isbn: string) {
    const book = await this.book.update({
      where: { isbn },
      data: {
        available: false
      }
    })
  }
}
