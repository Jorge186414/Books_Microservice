import { IsString } from "class-validator"

export class CreateReserveDto {

   @IsString()
   public isbn: string
}
