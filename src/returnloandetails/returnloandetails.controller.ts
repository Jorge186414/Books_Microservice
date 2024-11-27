import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ReturnloandetailsService } from './returnloandetails.service';
import { CreateReturnloandetailDto } from './dto/create-returnloandetail.dto';
import { UpdateReturnloandetailDto } from './dto/update-returnloandetail.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('returnloandetails')
export class ReturnloandetailsController {
  constructor(private readonly returnloandetailsService: ReturnloandetailsService) { }

  @Post()
  create(@Body() createReturnloandetailDto: CreateReturnloandetailDto) {
    return this.returnloandetailsService.create(createReturnloandetailDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.returnloandetailsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.returnloandetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReturnloandetailDto: UpdateReturnloandetailDto) {
    return this.returnloandetailsService.update(id, updateReturnloandetailDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.returnloandetailsService.remove(id);
  }
}
