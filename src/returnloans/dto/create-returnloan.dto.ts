import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class CreateReturnloanDto {

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public idpenalty: number

}
