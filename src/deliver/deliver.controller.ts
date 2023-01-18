import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { DeliverService } from "./deliver.service";
import { CreateDeliverDto } from "./dto/create-deliver.dto";
import { UpdateDeliverDto } from "./dto/update-deliver.dto";
import { adminGuard } from "../auth/admin.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Deliver")
@Controller("deliver")
export class DeliverController {
  constructor(private readonly deliverService: DeliverService) {
  }

  @ApiOperation({ summary: "Deliver qoshish" })
  @Post()
  @UseGuards(adminGuard)
  create(@Body() createDeliverDto: CreateDeliverDto) {
    return this.deliverService.create(createDeliverDto);
  }

  @ApiOperation({ summary: "Deliverlarni chiqarish" })
  @Get()
  @UseGuards(adminGuard)
  findAll() {
    return this.deliverService.findAll();
  }

  @ApiOperation({ summary: "Deliverni id boyicha olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.deliverService.findOne(+id);
  }

  @ApiOperation({ summary: "Deliverni id boyicha ozgartirish" })
  @Patch(":id")
  @UseGuards(adminGuard)
  update(@Param("id") id: string, @Body() updateDeliverDto: UpdateDeliverDto) {
    return this.deliverService.update(+id, updateDeliverDto);
  }

  @ApiOperation({ summary: "Deliverni id boyicha ochirish " })
  @Delete(":id")
  @UseGuards(adminGuard)
  remove(@Param("id") id: string) {
    return this.deliverService.remove(+id);
  }
}
