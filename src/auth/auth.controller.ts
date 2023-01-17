import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { createAdminDto } from "../admin/dto/adminRegister.dto";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { creatorGuard } from "./creator.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication/Authorization")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("/login")
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Post("/register")
  @UseInterceptors(FileInterceptor("profile_image"))
  register(@Body() createUserDto: CreateUserDto, @UploadedFile() profile_image) {
    return this.authService.register(createUserDto, profile_image);
  }

  @Post("/admin/register")
  registerAdmin(@Body() createAdminDto: createAdminDto) {
    return this.authService.registerAdmin(createAdminDto);
  }

  @Post("/admin/login")
  loginAdmin(@Body() loginDto: LoginUserDto) {
    return this.authService.loginAdmin(loginDto);
  }

  @Post("/admin/verify/:id")
  @UseGuards(creatorGuard)
  private async verifyAdmin(@Param("id") id: number) {
    return await this.authService.verifyAdmin(id);
  }
}
