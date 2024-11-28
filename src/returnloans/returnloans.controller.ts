import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateReturnloanDto } from './dto/create-returnloan.dto';
import { UpdateReturnloanDto } from './dto/update-returnloan.dto';
import { ReturnloansService } from './returnloans.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('returnloans')
export class ReturnloansController {
  constructor(private readonly returnloansService: ReturnloansService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_return_loan' })
  create(@Payload() createReturnloanDto: CreateReturnloanDto) {
    return this.returnloansService.create(createReturnloanDto);
  }

  // @Get()
  @MessagePattern({ cmd: "find_all" })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.returnloansService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: "find_one_return_loan" })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.returnloansService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_return_loan' })
  update(
    //   @Param('id', ParseIntPipe) id: number, 
    //   @Body() updateReturnloanDto: UpdateReturnloanDto
    @Payload() updateReturnloanDto: UpdateReturnloanDto) {
    return this.returnloansService.update(updateReturnloanDto.id, updateReturnloanDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_return_loan' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.returnloansService.remove(id);
  }
}
