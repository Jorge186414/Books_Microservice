import { Type } from "class-transformer"
import { IsNumber, IsPositive, IsString } from "class-validator"

export class CreatePenaltyDto {

   @IsString()
   public type: string

   @IsString()
   public description: string

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public cost: number
}
