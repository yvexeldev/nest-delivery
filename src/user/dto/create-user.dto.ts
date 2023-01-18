import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Azam" })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Abdusalomov" })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: "abdusalomovv@gmail.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: "./defaultpic.jpg" })
  @IsOptional()
  @IsString()
  profile_image?: string;
}
