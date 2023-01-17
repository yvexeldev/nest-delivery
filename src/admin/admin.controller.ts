import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { adminSelfGuard } from "../auth/admin.self.guard";
import { creatorGuard } from "../auth/creator.guard";
import { AdminService } from "./admin.service";
import { UpdateAdminDto } from "./dto/updateAdmin.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {
  }

  @Get()
  @UseGuards(creatorGuard)
  async getAll() {
    return await this.adminService.findAll();
  }

  @Get("/:id")
  @UseGuards(adminSelfGuard)
  async getOne(@Param("id") id) {
    return await this.adminService.findOne(+id);
  }

  @Patch("/:id")
  @UseGuards(adminSelfGuard)
  async update(@Body() updateAdminDto: UpdateAdminDto, @Param("id") id) {
    return await this.adminService.update(+id, updateAdminDto);
  }

  @Delete("/:id")
  @UseGuards(creatorGuard)
  async deleteAdmin(@Param("id") id) {
    return await this.adminService.delete(+id);
  }
}
