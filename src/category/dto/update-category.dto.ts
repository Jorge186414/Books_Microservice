import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { CreateCategoryDto } from './create-category.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number
}
