import { Injectable, Logger, NotFoundException, OnModuleInit, ParseIntPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateLoandetailDto } from './dto/create-loandetail.dto';
import { UpdateLoandetailDto } from './dto/update-loandetail.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LoandetailsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('LoanDetailsService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Database Connected')
  }
  create(createLoandetailDto: CreateLoandetailDto) {
    return this.loandetail.create({
      data: createLoandetailDto
    })
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto

    const totalPages = await this.loandetail.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.loandetail.findMany({
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
    const loanDetail = await this.loandetail.findUnique({
      where: { id, available: true }
    })

    if (!loanDetail) {
      throw new NotFoundException(`Loan Detail with id ${id} not found`)
    }
    return loanDetail
  }

  async update(id: number, updateLoandetailDto: UpdateLoandetailDto) {
    await this.findOne(id)

    return this.loandetail.update({
      where: { id },
      data: updateLoandetailDto
    })
  }

  async remove(id: number) {
    const loanDetail = await this.loandetail.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
