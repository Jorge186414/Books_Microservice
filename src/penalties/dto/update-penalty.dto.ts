import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { CreatePenaltyDto } from './create-penalty.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdatePenaltyDto extends PartialType(CreatePenaltyDto) {

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number

}
