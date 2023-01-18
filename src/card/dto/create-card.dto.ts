import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
  @ApiProperty({ example: "1" })
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: "HUMO" })
  @IsString()
  @IsNotEmpty()
  card_type: string;

  @ApiProperty({ example: "8600123456789878" })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: "12" })
  @IsNumberString()
  month: number;

  @ApiProperty({ example: "27" })
  @IsNumberString()
  year: number;
}
