import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Address } from "./entities/address.entity";
import { AuthModule } from "../auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Address]),
    AuthModule,
    AdminModule,
    UserModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
