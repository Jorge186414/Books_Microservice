import { Type } from "class-transformer"
import { IsNumber, IsPositive, IsString } from "class-validator"

export class CreateCategoryDto {

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public id: number

   @IsString()
   public nombre: string

   @IsString()
   public descripcion: string
}
