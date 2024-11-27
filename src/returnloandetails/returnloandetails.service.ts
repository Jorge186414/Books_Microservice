import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateReturnloandetailDto } from './dto/create-returnloandetail.dto';
import { UpdateReturnloandetailDto } from './dto/update-returnloandetail.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ReturnloandetailsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ReturnLoanDetailsService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Connected Database')
  }

  create(createReturnloandetailDto: CreateReturnloandetailDto) {
    return this.returnloandetail.create({
      data: createReturnloandetailDto
    })
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto

    const totalPages = await this.returnloandetail.count({
      where: { available: true }
    })

    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.returnloandetail.findMany({
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
    const returnLoanDetail = await this.returnloandetail.findUnique({
      where: { id, available: true }
    })

    if (!returnLoanDetail) {
      throw new NotFoundException(`Return Loan Detail with id ${id} not found`)
    }
    return returnLoanDetail
  }

  async update(id: number, updateReturnloandetailDto: UpdateReturnloandetailDto) {
    await this.findOne(id)

    return this.returnloandetail.update({
      where: { id },
      data: updateReturnloandetailDto
    })
  }

  async remove(id: number) {
    const returnLoanDetail = await this.returnloandetail.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
