import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { errorHandler } from '../catchError';
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { Branch } from "./entities/branch.entity";

@Injectable()
export class BranchService {
  constructor(@InjectModel(Branch) private branchRepo: typeof Branch) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    try {
      return await this.branchRepo.create(createBranchDto, {
        include: { all: true },
      });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findAll(): Promise<Branch[]> {
    try {
      return await this.branchRepo.findAll({ include: { all: true } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async findOne(id: number): Promise<Branch> {
    try {
      return await this.branchRepo.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (e) {
      errorHandler(e);
    }
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    try {
      await this.branchRepo.update({ ...updateBranchDto }, { where: { id } });
      return await this.findOne(id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      return await this.branchRepo.destroy({ where: { id } });
    } catch (e) {
      errorHandler(e);
    }
  }
}
