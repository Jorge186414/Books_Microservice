import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { CreateLoanDto } from './create-loan.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number
}
