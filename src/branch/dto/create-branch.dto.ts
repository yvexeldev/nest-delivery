import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBranchDto {
  @ApiProperty({ example: "Chilonzor" })
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()

  @ApiProperty({ example: "2134.405504342 234.24546562" })
  location: string;

  @ApiProperty({ example: "1" })
  @IsNumber()
  @IsNotEmpty()
  restaurant_id: number;
}
