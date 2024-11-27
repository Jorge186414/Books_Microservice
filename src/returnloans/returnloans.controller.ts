import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ReturnloansService } from './returnloans.service';
import { CreateReturnloanDto } from './dto/create-returnloan.dto';
import { UpdateReturnloanDto } from './dto/update-returnloan.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('returnloans')
export class ReturnloansController {
  constructor(private readonly returnloansService: ReturnloansService) { }

  @Post()
  create(@Body() createReturnloanDto: CreateReturnloanDto) {
    return this.returnloansService.create(createReturnloanDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.returnloansService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.returnloansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReturnloanDto: UpdateReturnloanDto) {
    return this.returnloansService.update(id, updateReturnloanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.returnloansService.remove(id);
  }
}
