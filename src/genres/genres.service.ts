import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class GenresService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('GenresService')

  onModuleInit() {
    this.$connect,
      this.logger.log('Database Connected')
  }
  create(createGenreDto: CreateGenreDto) {
    return this.genre.create({
      data: createGenreDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    const totalPages = await this.genre.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.genre.findMany({
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
    const category = await this.genre.findUnique({
      where: { id, available: true }
    })

    if (!category) {
      throw new NotFoundException(`Bookt wit isbn ${id} not found`)
    }

    return category
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id)

    return this.genre.update({
      where: { id },
      data: updateGenreDto
    })
  }

  async remove(id: number) {
    const category = await this.genre.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
