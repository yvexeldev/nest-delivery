import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { DeliverService } from "./deliver.service";
import { CreateDeliverDto } from "./dto/create-deliver.dto";
import { UpdateDeliverDto } from "./dto/update-deliver.dto";
import { adminGuard } from "../auth/admin.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Deliver")
@Controller("deliver")
export class DeliverController {
  constructor(private readonly deliverService: DeliverService) {
  }

  @Post()
  @UseGuards(adminGuard)
  create(@Body() createDeliverDto: CreateDeliverDto) {
    return this.deliverService.create(createDeliverDto);
  }

  @Get()
  @UseGuards(adminGuard)
  findAll() {
    return this.deliverService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.deliverService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(adminGuard)
  update(@Param("id") id: string, @Body() updateDeliverDto: UpdateDeliverDto) {
    return this.deliverService.update(+id, updateDeliverDto);
  }

  @Delete(":id")
  @UseGuards(adminGuard)
  remove(@Param("id") id: string) {
    return this.deliverService.remove(+id);
  }
}
