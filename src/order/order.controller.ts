import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { adminGuard } from "../auth/admin.guard";
import { userGuard } from "../auth/user.guard";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @ApiOperation({ summary: "Order yaratish" })
  @Post()
  @UseGuards(userGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: "Orderlarni korsatish" })
  @UseGuards(userGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: "Orderni ID boyicha GET qilish" })
  @UseGuards(userGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: "Orderni ID boyicha UPDATE qilish" })
  @Patch(":id")
  @UseGuards(adminGuard)
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Orderni ID boyicha DELETE qilish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderService.remove(+id);
  }
}
