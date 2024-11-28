import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { CreateGenreDto } from './create-genre.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number

}
