import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { adminGuard } from "../auth/admin.guard";

@ApiTags("Restaurant Branch")
@Controller("branch")
export class BranchController {
  constructor(private readonly branchService: BranchService) {
  }

  @ApiOperation({ summary: "Branch qoshish" })
  @Post()
  @UseGuards(adminGuard)
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @UseGuards(adminGuard)
  @ApiOperation({ summary: "Branchlarni chiqazish" })
  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @UseGuards(adminGuard)
  @ApiOperation({ summary: "Branch id boyicha olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.branchService.findOne(+id);
  }

  @UseGuards(adminGuard)
  @ApiOperation({ summary: "Branch id boyicha ozgartirish" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @UseGuards(adminGuard)
  @ApiOperation({ summary: "Branch qoshish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.branchService.remove(+id);
  }
}
