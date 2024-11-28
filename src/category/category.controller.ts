import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_category' })
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_category' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_category' })
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateCategoryDto: UpdateCategoryDto
    @Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto.id, updateCategoryDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_category' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
