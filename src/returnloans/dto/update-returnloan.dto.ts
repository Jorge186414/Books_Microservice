import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnloanDto } from './create-returnloan.dto';

import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReturnloanDto extends PartialType(CreateReturnloanDto) {
   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number
}
