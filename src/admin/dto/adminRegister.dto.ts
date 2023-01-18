import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createAdminDto {
  @ApiProperty({ example: "Azam" })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Abdusalomov" })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: "abdusalomovdev@gmail.com" })

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: "+998886702662" })
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ example: "./defaultpic.jpg" })
  @IsString()
  @IsOptional()
  profile_image: string;
}
