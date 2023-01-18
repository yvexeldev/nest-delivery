import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { adminSelfGuard } from "../auth/admin.self.guard";
import { creatorGuard } from "../auth/creator.guard";
import { AdminService } from "./admin.service";
import { UpdateAdminDto } from "./dto/updateAdmin.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {
  }

  @ApiOperation({ summary: "Adminlarni GET qilish" })
  @Get()
  @UseGuards(creatorGuard)
  async getAll() {
    return await this.adminService.findAll();
  }

  @ApiOperation({ summary: "Adminni GET qilish" })

  @Get("/:id")
  @UseGuards(adminSelfGuard)
  async getOne(@Param("id") id) {
    return await this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Adminni Ozgartirish " })

  @Patch("/:id")
  @UseGuards(adminSelfGuard)
  async update(@Body() updateAdminDto: UpdateAdminDto, @Param("id") id) {
    return await this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni Delete qilish" })
  @Delete("/:id")
  @UseGuards(creatorGuard)
  async deleteAdmin(@Param("id") id) {
    return await this.adminService.delete(+id);
  }
}
