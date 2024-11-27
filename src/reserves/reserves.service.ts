import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ReservesService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ReservesService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Database Connected')
  }


  create(createReserveDto: CreateReserveDto) {
    return this.reserve.create({
      data: createReserveDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    const totalPages = await this.reserve.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.reserve.findMany({
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
    const reserve = await this.reserve.findUnique({
      where: { id, available: true }
    })

    if (!reserve) {
      throw new NotFoundException(`Bookt wit isbn ${id} not found`)
    }

    return reserve
  }

  async update(id: number, updateReserveDto: UpdateReserveDto) {
    await this.findOne(id)

    return this.reserve.update({
      where: { id },
      data: updateReserveDto
    })
  }

  async remove(id: number) {
    const reserve = await this.reserve.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
