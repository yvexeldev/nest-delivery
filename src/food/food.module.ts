import { Module } from "@nestjs/common";
import { FoodService } from "./food.service";
import { FoodController } from "./food.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Food } from "./entities/food.entity";
import { FilesModule } from "../files/files.module";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Food]),
    FilesModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
