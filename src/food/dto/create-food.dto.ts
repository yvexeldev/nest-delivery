import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodDto {
  @ApiProperty({ example: "Gamburger" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Bu Gamburger" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: "./defaultpic.jpg" })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({ example: "10000" })
  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: "1" })
  @IsNumberString()
  @IsNotEmpty()
  restaurant_id: number;
}
