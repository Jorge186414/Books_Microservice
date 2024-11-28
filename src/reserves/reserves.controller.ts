import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ReservesService } from './reserves.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_reserve' })
  create(@Payload() createReserveDto: CreateReserveDto) {
    return this.reservesService.create(createReserveDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.reservesService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_reverse' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.reservesService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_penalty' })
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateReserveDto: UpdateReserveDto
    @Payload() updateReserveDto: UpdateReserveDto) {
    return this.reservesService.update(updateReserveDto.id, updateReserveDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_penalty' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.reservesService.remove(id);
  }
}
