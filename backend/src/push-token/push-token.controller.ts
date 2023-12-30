import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { JwtOptionalAuthGuard } from "src/auth/guards/jwt-optional-auth.guard";
import { TokenService } from "./push-token.service";

@Controller("push-tokens")
export class PushTokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post("register")
  @UseGuards(JwtOptionalAuthGuard)
  async registerToken(
    @Request() req: { user: { id: number } },
    @Body("token") token: string,
    @Body("deviceIdentifier") deviceIdentifier?: string,
  ) {
    await this.tokenService.createOrUpdateToken(
      req.user.id || null,
      token,
      deviceIdentifier,
    );
    return { message: "Token registered successfully" };
  }
}
