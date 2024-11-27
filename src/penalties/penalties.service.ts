import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PenaltiesService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('PenaltiesService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Connected Database')
  }

  create(createPenaltyDto: CreatePenaltyDto) {
    return this.penalty.create({
      data: createPenaltyDto
    })
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto

    const totalPages = await this.penalty.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.penalty.findMany({
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
    const penalty = await this.penalty.findUnique({
      where: { id, available: true }
    })

    if (!penalty) {
      throw new NotFoundException(`Penalty with id ${id} not found`)
    }
    return penalty
  }

  async update(id: number, updatePenaltyDto: UpdatePenaltyDto) {
    await this.findOne(id)

    return this.penalty.update({
      where: { id },
      data: updatePenaltyDto
    })
  }

  async remove(id: number) {
    const penalty = await this.penalty.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
