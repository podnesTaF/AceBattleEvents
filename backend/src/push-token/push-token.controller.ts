import { Body, Controller, Post, Request } from '@nestjs/common';
import { TokenService } from './push-token.service';

@Controller('push-tokens')
export class PushTokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('register')
  async registerToken(
    @Request() req: { user: { id: number } },
    @Body('token') token: string,
    @Body('deviceIdentifier') deviceIdentifier?: string,
  ) {
    await this.tokenService.createOrUpdateToken(
      req.user.id || null,
      token,
      deviceIdentifier,
    );
    return { message: 'Token registered successfully' };
  }
}
