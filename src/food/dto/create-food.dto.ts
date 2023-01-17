import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsNumberString()
  @IsNotEmpty()
  restaurant_id: number;
}
