import { Injectable, NotFoundException } from "@nestjs/common";
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt/dist";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcryptjs";
import { AdminService } from "../admin/admin.service";
import { createAdminDto } from "../admin/dto/adminRegister.dto";
import { Admin } from "../admin/entities/admin.entity";
import { User } from "../user/entities/user.entity";
import { errorHandler } from "../catchError";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private adminService: AdminService
  ) {
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);
    return {
      token,
      id: user.id
    };
  }

  async loginAdmin(loginDto: LoginUserDto) {
    const admin = await this.validateAdmin(loginDto);
    const token = await this.generateTokenAdmin(admin);
    return {
      token,
      id: admin.id
    };
  }

  async register(createUserDto: CreateUserDto, profile_image: any) {
    try {
      if (!profile_image) {
        profile_image = "defaultpic.jpg";
      }

      const candidate = await this.userService.getByEmail(createUserDto.email);
      if (candidate) {
        console.log(candidate);
        throw new BadRequestException(
          `${createUserDto.email} emailida uje user bor! Iltimos login qiling!`
        );
      }
      const hashPassword = await bcrypt.hash(createUserDto.password, 7);
      const user = await this.userService.create(
        {
          ...createUserDto,
          password: hashPassword
        },
        profile_image
      );
      const token = await this.generateToken(user);
      return {
        token,
        id: user.id
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async generateToken(user: User) {
    try {
      const payload = {
        email: user.email,
        sub: user.id,
        role: "USER"
      };
      return this.jwtService.sign(payload);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async generateTokenAdmin(user: Admin) {
    try {
      const payload = {
        email: user.email,
        sub: user.id,
        role: "ADMIN"
      };
      return this.jwtService.sign(payload);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }


  private async validateUser(loginDto: LoginUserDto) {
    const user = await this.userService.getByEmail(loginDto.email);
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException("Email yoki parol hato");
  }

  private async validateAdmin(loginDto: LoginUserDto) {
    const admin = await this.adminService.getByEmail(loginDto.email);
    if (!admin) {
      throw new NotFoundException("Bunday Admin TOpilmadi!");
    }
    const passwordEquels = await bcrypt.compare(
      loginDto.password,
      admin.password
    );
    if (admin && passwordEquels) {
      return admin;
    }
    throw new UnauthorizedException("Email Yoki Parol Hato!");
  }

  async registerAdmin(createAdminDto: createAdminDto) {
    try {
      const candidate = await this.adminService.getByEmail(
        createAdminDto.email
      );
      const condition = await this.adminService.getByPhone(
        createAdminDto.phone_number
      );
      if (condition) {
        throw new BadRequestException(
          `${createAdminDto.phone_number} nomerida uje admin bor! Iltimos login qiling!`
        );
      }

      if (candidate) {
        console.log(candidate);
        throw new BadRequestException(
          `${createAdminDto.email} emailida uje admin bor! Iltimos login qiling!`
        );
      }
      const hashPassword = await bcrypt.hash(createAdminDto.password, 7);
      const admin = await this.adminService.createAdmin({
        ...createAdminDto,
        password: hashPassword
      });
      const token = await this.generateTokenAdmin(admin);
      return {
        token,
        id: admin.id
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async verifyAdmin(id: number) {
    try {
      const adminExists = await this.adminService.findOne(id);
      if (!adminExists) {
        throw new NotFoundException("Bunday Admin yo'q!");
      }
      if (adminExists.is_verified) {
        throw new BadRequestException("Bu admin uje verifikatsiyadan o'tgan!");
      }
      await this.adminService.verify(id);
      return {
        status: "OK",
        data: { ...adminExists.dataValues, is_verified: true }
      };
    } catch (e) {
      errorHandler(e);
    }
  }
}
