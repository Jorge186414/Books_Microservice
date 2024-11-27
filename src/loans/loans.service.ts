import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LoansService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('LoansService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Database Connected')
  }

  create(createLoanDto: CreateLoanDto) {
    return this.loan.create({
      data: createLoanDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    const totalPages = await this.loan.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.loan.findMany({
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
    const loan = await this.loan.findUnique({
      where: { id, available: true }
    })

    if (!loan) {
      throw new NotFoundException(`Bookt wit isbn ${id} not found`)
    }

    return loan
  }

  async update(id: number, updateLoanDto: UpdateLoanDto) {
    await this.findOne(id)

    return this.loan.update({
      where: { id },
      data: updateLoanDto
    })
  }

  async remove(id: number) {
    const loan = await this.loan.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
