import { IsMilitaryTime, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
  @ApiProperty({ example: "Rayhon" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Rayhon bu rayhon" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: "21.3456754 123.23456754" })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: "+998886702662" })
  @IsString()
  @IsPhoneNumber("UZ")
  contact_num: string;

  @ApiProperty({ example: "09:00" })
  @IsMilitaryTime()
  open_time: string;

  @ApiProperty({ example: "21:00" })
  @IsMilitaryTime()
  close_time: string;

  @ApiProperty({ example: "./defaultrestpic.jpg" })
  @IsString()
  @IsOptional()
  photo: string;
}
