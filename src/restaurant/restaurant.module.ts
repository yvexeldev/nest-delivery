import { Module } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";
import { Restaurant } from "./entities/restaurant.entity";
import { AuthModule } from "../auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { FilesModule } from "../files/files.module";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forFeature([Restaurant]),
    AuthModule,
    AdminModule,
    FilesModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
