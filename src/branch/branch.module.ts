import { Module } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { BranchController } from "./branch.controller";
import { Branch } from "./entities/branch.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [SequelizeModule.forFeature([Branch]), AuthModule, AdminModule, UserModule],
  controllers: [BranchController],
  providers: [BranchService]
})
export class BranchModule {
}
