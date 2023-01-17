import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address) private addressRepo: typeof Address) {}
  async create(createAddressDto: CreateAddressDto) {
    try {
      return await this.addressRepo.create(createAddressDto, {
        include: { all: true },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    try {
      return await this.addressRepo.findAll({ include: { all: true } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.addressRepo.findByPk(id, { include: { all: true } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      return await this.addressRepo.update(updateAddressDto, { where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.addressRepo.destroy( { where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
