import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateCardDto {
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  card_type: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsNumberString()
  month: number;

  @IsNumberString()
  year: number;
}
