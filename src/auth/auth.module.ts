import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AdminModule } from "../admin/admin.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    AdminModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || "MySecretNestKey",
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES || "30d",
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
