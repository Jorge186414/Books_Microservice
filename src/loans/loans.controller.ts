import { Controller,ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_loan' })
  create(@Payload() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.loansService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_loan' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.loansService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_loan' })
  update(
    // @Param('id', ParseIntPipe) id: number,
    // @Body() updateLoanDto: UpdateLoanDto
    @Payload() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(updateLoanDto.id, updateLoanDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_loan' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.loansService.remove(id);
  }
}
