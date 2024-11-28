import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { CreateReturnloandetailDto } from './create-returnloandetail.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateReturnloandetailDto extends PartialType(CreateReturnloandetailDto) {
   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number
}
