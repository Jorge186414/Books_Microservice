import { PartialType } from '@nestjs/mapped-types';
import { CreateLoandetailDto } from './create-loandetail.dto';

export class UpdateLoandetailDto extends PartialType(CreateLoandetailDto) {}
