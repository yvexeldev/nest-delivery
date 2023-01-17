import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./entities/order.entity";
import { AuthModule } from "../auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [SequelizeModule.forFeature([Order]), AuthModule, AdminModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {
}
