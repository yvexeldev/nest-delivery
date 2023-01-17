import { Module } from "@nestjs/common";
import { DeliverService } from "./deliver.service";
import { DeliverController } from "./deliver.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Deliver } from "./entities/deliver.entity";
import { AuthModule } from "../auth/auth.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [SequelizeModule.forFeature([Deliver]), AuthModule, AdminModule],
  controllers: [DeliverController],
  providers: [DeliverService]
})
export class DeliverModule {}
