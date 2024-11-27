import { Module } from '@nestjs/common';
import { ReturnloandetailsService } from './returnloandetails.service';
import { ReturnloandetailsController } from './returnloandetails.controller';

@Module({
  controllers: [ReturnloandetailsController],
  providers: [ReturnloandetailsService],
})
export class ReturnloandetailsModule {}
