import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './branch/branch.module';
import { FilesModule } from './files/files.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';
import { DeliverModule } from './deliver/deliver.module';
import { AddressModule } from './address/address.module';
import { CardModule } from './card/card.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [__dirname + "dist/**/*.entity{.ts, .js}"],
      autoLoadModels: true,
      logging: true,
    }),
    AdminModule,
    AuthModule,
    BranchModule,
    FilesModule,
    RestaurantModule,
    UserModule,
    FoodModule,
    DeliverModule,
    AddressModule,
    CardModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
