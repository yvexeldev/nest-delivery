import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { where } from "sequelize";
import { errorHandler } from "../catchError";
import { createAdminDto } from "./dto/adminRegister.dto";
import { UpdateAdminDto } from "./dto/updateAdmin.dto";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}

  async createAdmin(createAdminDto: createAdminDto): Promise<Admin> {
    try {
      return await this.adminRepository.create(createAdminDto);
    } catch (e) {
      errorHandler(e);
    }
  }

  async findAll(): Promise<Admin[]> {
    try {
      return await this.adminRepository.findAll();
    } catch (e) {
      errorHandler(e);
    }
  }

  async findOne(id: number): Promise<Admin> {
    try {
      return await this.adminRepository.findByPk(id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    try {
      await this.adminRepository.update(
        { ...updateAdminDto },
        { where: { id } }
      );
      return await this.findOne(id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      return await this.adminRepository.destroy({ where: { id } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async getByEmail(email: string) {
    try {
      return this.adminRepository.findOne({ where: { email } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async verify(id: number) {
    try {
      await this.adminRepository.update(
        {
          is_verified: true,
        },
        { where: { id } }
      );
    } catch (e) {
      errorHandler(e);
    }
  }

  async creator() {
    try {
      await this.adminRepository.update(
        { is_verified: true, is_creator: true },
        { where: { email: "abdusalomovdev@gmail.com" } }
      );
    } catch (e) {
      errorHandler(e);
    }
  }

  async getByPhone(phone_number: string) {
    try {
      const candidate = await this.adminRepository.findOne({
        where: { phone_number },
      });
      return candidate;
    } catch (e) {
      errorHandler(e);
    }
  }
}
