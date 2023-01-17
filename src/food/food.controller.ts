import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FoodService } from "./food.service";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { adminGuard } from "../auth/admin.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Food")
@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {
  }

  @Post()
  @UseGuards(adminGuard)
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createFoodDto: CreateFoodDto, @UploadedFile() photo) {
    return this.foodService.create(createFoodDto, photo);
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(adminGuard)
  @UseInterceptors(adminGuard)
  update(
    @Param("id") id: string,
    @Body() updateFoodDto: UpdateFoodDto,
    @UploadedFile() photo
  ) {
    return this.foodService.update(+id, updateFoodDto, photo);
  }

  @Delete(":id")
  @UseGuards(adminGuard)
  remove(@Param("id") id: string) {
    return this.foodService.remove(+id);
  }
}
