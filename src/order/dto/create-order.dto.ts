import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @IsNumberString()
  @IsNotEmpty()
  card_id: number;

  @IsNotEmpty()
  @IsNumberString()
  deliver_id: number;

  @IsNotEmpty()
  @IsNumberString()
  address_id: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNumberString()
  @IsNotEmpty()
  food: number;

  total_amount: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsEnum(["PENDING", "PAID", "CANCELLED"])
  @IsNotEmpty()
  status: "PENDING" | "PAID" | "CANCELLED";
}
