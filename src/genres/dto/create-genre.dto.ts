import { IsString } from "class-validator";

export class CreateGenreDto {
   @IsString()
   public name: string
}
