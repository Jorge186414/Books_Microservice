import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { CreateReserveDto } from './create-reserve.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateReserveDto extends PartialType(CreateReserveDto) {

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number
}
