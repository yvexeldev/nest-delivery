import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AdminService } from "../admin/admin.service";

type payload = {
  email: string;
  role: "ADMIN" | "USER"
  sub: number;
  iat: number;
  exp: number;
};

@Injectable()
export class adminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    try {

      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException("4O4 N0t F0UND");
      }
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (!token && !bearer) {
        throw new UnauthorizedException("404 N0T FOUND");
      }

      const admin: payload = this.jwtService.verify(token);

      if (admin.role !== "ADMIN") {
        throw new UnauthorizedException("UNAUTHORIZED!");
      }
      const checkAdmin = await this.adminService.findOne(admin.sub);
      if (!checkAdmin || !checkAdmin.is_verified) {
        throw new UnauthorizedException("UNAUTHORIZED");
      }
      return true;

    } catch (e) {
      console.log(e);
      throw new UnauthorizedException("4O4 NOT FOUND");
    }
  }
}
