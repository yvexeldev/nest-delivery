import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { FilesService } from "../files/files.service";
import { InjectModel } from "@nestjs/sequelize";
import { where } from "sequelize";
import { errorHandler } from "../catchError";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant)
    private restaurantRepository: typeof Restaurant,
    readonly fileService: FilesService
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto, photo: any) {
    try {
      createRestaurantDto.photo = await this.fileService.createFile(photo);
      return await this.restaurantRepository.create(createRestaurantDto, {
        include: { all: true },
      });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findAll() {
    try {
      return await this.restaurantRepository.findAll({
        include: { all: true },
      });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findOne(id: number) {
    try {
      return await this.restaurantRepository.findOne({
        where: {
          id,
        },
        include: { all: true },
      });
    } catch (e) {
      errorHandler(e);
    }
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
    photo: any
  ) {
    try {
      if (photo) {
        let oldLink: string | Restaurant = await this.findOne(id);
        oldLink = oldLink.photo;
        updateRestaurantDto.photo = await this.fileService.createFile(photo);
        if (oldLink.length === 40) {
          await this.fileService.deleteFile(oldLink);
        }
        await this.restaurantRepository.update(updateRestaurantDto, {
          where: { id },
        });
        return await this.findOne(id);
      }
      console.log(updateRestaurantDto);

      await this.restaurantRepository.update(
        { ...updateRestaurantDto },
        { where: { id } }
      );
      return await this.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      return await this.restaurantRepository.destroy({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }
}
