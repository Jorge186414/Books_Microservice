import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateReturnloanDto } from './dto/create-returnloan.dto';
import { UpdateReturnloanDto } from './dto/update-returnloan.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ReturnloansService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ReturnLoansService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Database Connected')
  }

  create(createReturnloanDto: CreateReturnloanDto) {
    return this.returnloan.create({
      data: createReturnloanDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    const totalPages = await this.returnloan.count({
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
    const returnLoan = await this.returnloan.findUnique({
      where: { id, available: true }
    })

    if (!returnLoan) {
      throw new NotFoundException(`Return Loan with id ${id} not found`)
    }
    return returnLoan
  }

  async update(id: number, updateReturnloanDto: UpdateReturnloanDto) {
    await this.findOne(id)

    return this.returnloan.update({
      where: { id },
      data: updateReturnloanDto
    })
  }

  async remove(id: number) {
    const returnLoan = await this.returnloan.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
