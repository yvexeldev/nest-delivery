import { IsMilitaryTime, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsPhoneNumber("UZ")
  contact_num: string;

  @IsMilitaryTime()
  open_time: string;

  @IsMilitaryTime()
  close_time: string;

  @IsString()
  @IsOptional()
  photo: string;
}
