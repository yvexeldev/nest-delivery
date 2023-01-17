import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./entities/order.entity";
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order) {
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      return await this.orderRepo.create(createOrderDto);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    try {
      return await this.orderRepo.findAll({ include: { all: true } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.orderRepo.findByPk(id, { include: { all: true } });

    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      return await this.orderRepo.update(updateOrderDto, { where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.orderRepo.destroy({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
