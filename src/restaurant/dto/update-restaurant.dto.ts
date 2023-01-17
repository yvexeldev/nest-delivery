import { IsMilitaryTime, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsPhoneNumber("UZ")
  @IsOptional()
  contact_num: string;

  @IsMilitaryTime()
  @IsOptional()
  open_time: string;

  @IsMilitaryTime()
  @IsOptional()
  close_time: string;

  @IsString()
  @IsOptional()
  photo: string;
}
