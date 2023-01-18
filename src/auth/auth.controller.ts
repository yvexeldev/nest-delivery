import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { createAdminDto } from "../admin/dto/adminRegister.dto";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { creatorGuard } from "./creator.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication/Authorization")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({ summary: "LOGIN User" })
  @Post("/login")
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: "Register User" })
  @Post("/register")
  @UseInterceptors(FileInterceptor("profile_image"))
  register(@Body() createUserDto: CreateUserDto, @UploadedFile() profile_image) {
    return this.authService.register(createUserDto, profile_image);
  }

  @ApiOperation({ summary: "Register Admin" })
  @Post("/admin/register")
  registerAdmin(@Body() createAdminDto: createAdminDto) {
    return this.authService.registerAdmin(createAdminDto);
  }

  @ApiOperation({ summary: "LOGIN Admin" })

  @Post("/admin/login")
  loginAdmin(@Body() loginDto: LoginUserDto) {
    return this.authService.loginAdmin(loginDto);
  }

  @ApiOperation({ summary: "Verify Admin" })
  @Post("/admin/verify/:id")
  @UseGuards(creatorGuard)
  private async verifyAdmin(@Param("id") id: number) {
    return await this.authService.verifyAdmin(id);
  }
}
