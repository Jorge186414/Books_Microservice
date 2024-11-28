import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_genre' })
  create(@Payload() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.genresService.findAll(paginationDto);
  }

  // @Get(':
  @MessagePattern({ cmd: 'find_one_genre' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_genre' })
  update(
    // @Param('id') id: string,
    // @Body() updateProductDto: UpdateProductDto)
    @Payload() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(updateGenreDto.id, updateGenreDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_genre' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.genresService.remove(id);
  }
}
