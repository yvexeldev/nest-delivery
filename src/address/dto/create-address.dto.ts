import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {

  @ApiProperty({ example: "1" })
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: "Karshi" })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: "Amir Temur" })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: "16A" })
  @IsString()
  @IsNotEmpty()
  house: string;
}
