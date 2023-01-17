import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { adminGuard } from "../auth/admin.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Restaurant")
@Controller("restaurant")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {
  }

  @Post()
  @UseGuards(adminGuard)
  @UseInterceptors(FileInterceptor("photo"))
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() photo
  ) {
    return this.restaurantService.create(createRestaurantDto, photo);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantService.findOne(+id);
  }

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

  @Delete(":id")
  @UseGuards(adminGuard)
  remove(@Param("id") id: string) {
    return this.restaurantService.remove(+id);
  }
}
