import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";
import { AdminController } from "./admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || "MySecretNestKey",
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES || "30d",
      },
    }),
  ],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
