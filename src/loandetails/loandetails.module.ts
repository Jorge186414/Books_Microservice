import { Module } from '@nestjs/common';
import { LoandetailsService } from './loandetails.service';
import { LoandetailsController } from './loandetails.controller';

@Module({
  controllers: [LoandetailsController],
  providers: [LoandetailsService],
})
export class LoandetailsModule {}
