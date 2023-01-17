import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDeliverDto } from "./dto/create-deliver.dto";
import { UpdateDeliverDto } from "./dto/update-deliver.dto";
import { Deliver } from "./entities/deliver.entity";
import { errorHandler } from "../catchError";

@Injectable()
export class DeliverService {
  constructor(@InjectModel(Deliver) private driverRepo: typeof Deliver) {}

  async create(createDeliverDto: CreateDeliverDto) {
    try {
      const check = await this.driverRepo.findOne({
        where: { user_id: createDeliverDto.user_id },
      });
      if (check) {
        throw new BadRequestException("Bunday Deliver bor!");
      }
      return await this.driverRepo.create(createDeliverDto, {
        include: {
          all: true,
        },
      });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findAll() {
    try {
      return await this.driverRepo.findAll({ include: { all: true } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findOne(id: number) {
    try {
      return await this.driverRepo.findByPk(id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async update(id: number, updateDeliverDto: UpdateDeliverDto) {
    try {
      return await this.driverRepo.update(updateDeliverDto, { where: { id } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async remove(id: number) {
    try {
      return await this.driverRepo.destroy({ where: { id } });
    } catch (e) {
      errorHandler(e);
    }
  }
}
