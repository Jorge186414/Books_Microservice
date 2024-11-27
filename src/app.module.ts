import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { CategoryModule } from './category/category.module';
import { ReservesModule } from './reserves/reserves.module';
import { GenresModule } from './genres/genres.module';
import { LoansModule } from './loans/loans.module';
import { LoandetailsModule } from './loandetails/loandetails.module';
import { ReturnloansModule } from './returnloans/returnloans.module';
import { ReturnloandetailsModule } from './returnloandetails/returnloandetails.module';
import { PenaltiesModule } from './penalties/penalties.module';

@Module({
  imports: [BooksModule, CategoryModule, ReservesModule, GenresModule, LoansModule, LoandetailsModule, ReturnloansModule, ReturnloandetailsModule, PenaltiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
