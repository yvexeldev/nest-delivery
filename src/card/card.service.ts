import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Card } from "./entities/card.entity";

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private cardRepo: typeof Card) {
  }

  async create(createCardDto: CreateCardDto) {
    try {
      return this.cardRepo.create(createCardDto, { include: { all: true } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  async findAll() {
    try {
      return this.cardRepo.findAll({ include: { all: true } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  async findOne(id: number, user_id) {
    try {
      return this.cardRepo.findByPk(id, { include: { all: true } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    try {
      return this.cardRepo.update(updateCardDto, { where: { id } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.cardRepo.destroy({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }
}
