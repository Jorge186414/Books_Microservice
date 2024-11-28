import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { CreateLoandetailDto } from './create-loandetail.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateLoandetailDto extends PartialType(CreateLoandetailDto) {
   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number
}
