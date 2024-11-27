import { Module } from '@nestjs/common';
import { ReturnloansService } from './returnloans.service';
import { ReturnloansController } from './returnloans.controller';

@Module({
  controllers: [ReturnloansController],
  providers: [ReturnloansService],
})
export class ReturnloansModule {}
