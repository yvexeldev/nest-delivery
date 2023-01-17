import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateDeliverDto {
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  transport_type: string;
}
