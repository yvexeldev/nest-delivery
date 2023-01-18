import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({ example: "1" })
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: "1" })
  @IsNumberString()
  @IsNotEmpty()
  card_id: number;

  @ApiProperty({ example: "1" })
  @IsNotEmpty()
  @IsNumberString()
  deliver_id: number;

  @ApiProperty({ example: "1" })
  @IsNotEmpty()
  @IsNumberString()
  address_id: number;

  @ApiProperty({ example: "2022-02-02" })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ example: "1" })
  @IsNumberString()
  @IsNotEmpty()
  food: number;

  total_amount: number;

  @ApiProperty({ example: "Comment for Comment" })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ example: "PAID" })
  @IsEnum(["PENDING", "PAID", "CANCELLED"])
  @IsNotEmpty()
  status: "PENDING" | "PAID" | "CANCELLED";
}
