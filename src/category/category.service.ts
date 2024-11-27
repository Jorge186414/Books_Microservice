import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CategoryService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('CategoryService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Database Connected')
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.category.create({
      data: createCategoryDto
    })
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto

    const totalPages = await this.book.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.category.findMany({
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

  async findOne(id: number) {
    const category = await this.category.findUnique({
      where: { id, available: true }
    })

    if (!category) {
      throw new NotFoundException(`Bookt wit isbn ${id} not found`)
    }

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id)

    return this.category.update({
      where: { id },
      data: updateCategoryDto
    })
  }

  async remove(id: number) {
    const category = await this.category.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
