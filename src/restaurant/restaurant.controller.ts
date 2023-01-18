import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { adminGuard } from "../auth/admin.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Restaurant")
@Controller("restaurant")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {
  }

  @ApiOperation({ summary: "Restoran yaratish" })
  @Post()
  @UseGuards(adminGuard)
  @UseInterceptors(FileInterceptor("photo"))
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() photo
  ) {
    return this.restaurantService.create(createRestaurantDto, photo);
  }

  @ApiOperation({ summary: "Restoranlarni chiqarish" })
  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @ApiOperation({ summary: "Restoranni id boyicha olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantService.findOne(+id);
  }

  @ApiOperation({ summary: "Restoranni id boyicha path qilish" })
  @Patch(":id")
  @UseGuards(adminGuard)
  @UseInterceptors(FileInterceptor("photo"))
  update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @UploadedFile() photo: string
  ) {
    return this.restaurantService.update(+id, updateRestaurantDto, photo);
  }

  @ApiOperation({ summary: "restoranni delete qilish" })
  @Delete(":id")
  @UseGuards(adminGuard)
  remove(@Param("id") id: string) {
    return this.restaurantService.remove(+id);
  }
}
