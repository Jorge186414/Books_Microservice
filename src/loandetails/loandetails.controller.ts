import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoandetailsService } from './loandetails.service';
import { CreateLoandetailDto } from './dto/create-loandetail.dto';
import { UpdateLoandetailDto } from './dto/update-loandetail.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('loandetails')
export class LoandetailsController {
  constructor(private readonly loandetailsService: LoandetailsService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_loan_details' })
  create(@Payload() createLoandetailDto: CreateLoandetailDto) {
    return this.loandetailsService.create(createLoandetailDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.loandetailsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_loan_details' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.loandetailsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_loan_details' })
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateLoandetailDto: UpdateLoandetailDto
    @Payload() updateLoandetailDto: UpdateLoandetailDto) {
    return this.loandetailsService.update(updateLoandetailDto.id, updateLoandetailDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_loan_details' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.loandetailsService.remove(id);
  }
}
