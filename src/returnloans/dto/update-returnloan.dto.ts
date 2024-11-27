import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnloanDto } from './create-returnloan.dto';

export class UpdateReturnloanDto extends PartialType(CreateReturnloanDto) {}
