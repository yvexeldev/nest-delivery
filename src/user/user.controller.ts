import { Body, Controller, Delete, Get, Param, Patch, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { adminGuard } from "../auth/admin.guard";
import { userGuard } from "../auth/user.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @UseGuards(adminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @UseGuards(userGuard)
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")

  @UseGuards(userGuard)
  @UseInterceptors(FileInterceptor("profile_image"))
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() profile_image: string) {
    return this.userService.update(+id, updateUserDto, profile_image);
  }

  @Delete(":id")
  @UseGuards(adminGuard)
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
