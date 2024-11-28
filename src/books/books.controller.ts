import { Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  // @Post()
  @MessagePattern({ cmd: 'create_book' })
  create(@Payload() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.booksService.findAll(paginationDto);
  }

  // @Get(':isbn')
  @MessagePattern({ cmd: 'find_one_book' })
  findOne(@Payload('isbn') isbn: string) {
    return this.booksService.findOne(isbn);
  }

  // @Patch(':isbn')
  @MessagePattern({ cmd: 'update_book' })
  update(
    // @Param('isbn') isbn: string, 
    // @Body() updateBookDto: UpdateBookDto
    @Payload() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto.isbn, updateBookDto);
  }

  // @Delete(':isbn')
  @MessagePattern({ cmd: 'delete_book' })
  remove(@Payload('isbn') isbn: string) {
    return this.booksService.remove(isbn);
  }
}
