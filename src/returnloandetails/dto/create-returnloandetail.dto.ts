import { Type } from "class-transformer"
import { IsNumber, IsPositive, IsString } from "class-validator"

export class CreateReturnloandetailDto {

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public idreturnloan: number

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public idloandetail: number

   @IsString()
   public description: string

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public total: number
}
