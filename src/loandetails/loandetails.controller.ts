import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { LoandetailsService } from './loandetails.service';
import { CreateLoandetailDto } from './dto/create-loandetail.dto';
import { UpdateLoandetailDto } from './dto/update-loandetail.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('loandetails')
export class LoandetailsController {
  constructor(private readonly loandetailsService: LoandetailsService) { }

  @Post()
  create(@Body() createLoandetailDto: CreateLoandetailDto) {
    return this.loandetailsService.create(createLoandetailDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.loandetailsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.loandetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLoandetailDto: UpdateLoandetailDto) {
    return this.loandetailsService.update(id, updateLoandetailDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.loandetailsService.remove(id);
  }
}
