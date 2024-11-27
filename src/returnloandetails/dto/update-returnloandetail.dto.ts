import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnloandetailDto } from './create-returnloandetail.dto';

export class UpdateReturnloandetailDto extends PartialType(CreateReturnloandetailDto) {}
