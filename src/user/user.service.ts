import { Injectable } from "@nestjs/common";
import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common/exceptions";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { FilesService } from "../files/files.service";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UserService {
  constructor(
    readonly fileService: FilesService,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async create(
    createUserDto: CreateUserDto,
    profile_image: any
  ): Promise<User> {
    try {
      createUserDto.profile_image = await this.fileService.createFile(
        profile_image
      );
      return await this.userRepository.create(createUserDto);
    } catch (err) {
      throw new BadRequestException(err.message, "ERROR!");
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll({ include: { all: true } });
    } catch (err) {
      throw new BadRequestException(err.message, "ERROR!");
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (err) {
      throw new BadRequestException(err.message, "ERROR!");
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    profile_image: any
  ): Promise<User> {
    try {
      let oldLink: string | User = await this.findOne(id);
      oldLink = oldLink.profile_image;
      let new_profile_image;
      if (profile_image) {
        new_profile_image = await this.fileService.createFile(profile_image);
        if (oldLink.length === 40) {
          await this.fileService.deleteFile(oldLink);
        }
      }
      await this.userRepository.update(
        { ...updateUserDto, profile_image: new_profile_image },
        { where: { id } }
      );
      return await this.findOne(id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      return await this.userRepository.destroy({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message, "ERROR!");
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e.message);
    }
  }
}
