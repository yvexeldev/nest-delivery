import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDeliverDto {
  @ApiProperty({ example: "1" })
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: "Gentra" })
  @IsString()
  @IsNotEmpty()
  transport_type: string;
}
