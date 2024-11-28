import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PenaltiesService } from './penalties.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('penalties')
export class PenaltiesController {
  constructor(private readonly penaltiesService: PenaltiesService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_penalty' })
  create(@Payload() createPenaltyDto: CreatePenaltyDto) {
    return this.penaltiesService.create(createPenaltyDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.penaltiesService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_penalty' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.penaltiesService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_penalty' })
  update(
    //   @Param('id', ParseIntPipe) id: number, 
    // @Body() updatePenaltyDto: UpdatePenaltyDto
    @Payload() updatePenaltyDto: UpdatePenaltyDto) {
    return this.penaltiesService.update(updatePenaltyDto.id, updatePenaltyDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_penalty' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.penaltiesService.remove(id);
  }
}
