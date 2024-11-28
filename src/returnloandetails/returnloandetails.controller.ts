import { Controller, ParseIntPipe } from '@nestjs/common';
import { ReturnloandetailsService } from './returnloandetails.service';
import { CreateReturnloandetailDto } from './dto/create-returnloandetail.dto';
import { UpdateReturnloandetailDto } from './dto/update-returnloandetail.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('returnloandetails')
export class ReturnloandetailsController {
  constructor(private readonly returnloandetailsService: ReturnloandetailsService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_return_loan_details' })
  create(@Payload() createReturnloandetailDto: CreateReturnloandetailDto) {
    return this.returnloandetailsService.create(createReturnloandetailDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.returnloandetailsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_return_loan_detail' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.returnloandetailsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_return_loan_details' })
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateReturnloandetailDto: UpdateReturnloandetailDto
    @Payload() updateReturnloandetailDto: UpdateReturnloandetailDto) {
    return this.returnloandetailsService.update(updateReturnloandetailDto.id, updateReturnloandetailDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_return_loan_detail' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.returnloandetailsService.remove(id);
  }
}
