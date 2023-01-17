import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { FilesModule } from "../files/files.module";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User]),
    AdminModule,
    FilesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
