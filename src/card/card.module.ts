import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Card } from "./entities/card.entity";
import { AuthModule } from "../auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [SequelizeModule.forFeature([Card]), AuthModule, AdminModule, UserModule],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {
}
