import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PenaltiesService } from './penalties.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('penalties')
export class PenaltiesController {
  constructor(private readonly penaltiesService: PenaltiesService) { }

  @Post()
  create(@Body() createPenaltyDto: CreatePenaltyDto) {
    return this.penaltiesService.create(createPenaltyDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.penaltiesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.penaltiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePenaltyDto: UpdatePenaltyDto) {
    return this.penaltiesService.update(id, updatePenaltyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.penaltiesService.remove(id);
  }
}
