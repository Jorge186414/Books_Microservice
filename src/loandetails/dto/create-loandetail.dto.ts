import { Type } from "class-transformer"
import { IsNumber, IsPositive, IsString } from "class-validator"

export class CreateLoandetailDto {

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public idloan: number

   @IsString()
   public isbn: string

   @IsString()
   public description: string
}
