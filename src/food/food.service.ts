import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { errorHandler } from "../catchError";
import { FilesService } from "../files/files.service";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { Food } from "./entities/food.entity";

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food) private foodRepo: typeof Food,
    private fileService: FilesService
  ) {
  }

  async create(createFoodDto: CreateFoodDto, photo: any) {
    try {
      createFoodDto.photo = await this.fileService.createFile(photo);
      return await this.foodRepo.create(createFoodDto, {
        include: { all: true }
      });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findAll() {
    try {
      return await this.foodRepo.findAll({ include: { all: true } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findOne(id: number) {
    try {
      return await this.foodRepo.findByPk(id, { include: { all: true } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async update(id: number, updateFoodDto: UpdateFoodDto, photo: any) {
    try {
      if (photo) {
        let oldLink: Food | string = await this.findOne(id);
        oldLink = oldLink.photo;
        updateFoodDto.photo = await this.fileService.createFile(photo);
        if (oldLink.length === 40) {
          await this.fileService.deleteFile(oldLink);
        }
        await this.foodRepo.update(updateFoodDto, {
          where: { id }
        });
        return await this.findOne(id);
      }

      await this.foodRepo.update(updateFoodDto, { where: { id } });
      return await this.findOne(id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async remove(id: number) {
    try {
      return await this.foodRepo.destroy({ where: { id } });
    } catch (e) {
      errorHandler(e);
    }
  }
}
