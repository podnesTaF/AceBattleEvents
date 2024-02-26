import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { OneTimeTokenService } from './ott.service';

@Controller('ott')
export class OttController {
  constructor(private readonly ottService: OneTimeTokenService) {}

  @Post('validate')
  async validateOtt(@Body() body: { ott: string }) {
    console.log('body', body.ott);
    const jwtToken = await this.ottService.validateAndRemoveToken(body.ott);
    if (!jwtToken) {
      throw new UnauthorizedException('Invalid or expired OTT');
    }

    // Set the JWT in an HttpOnly cookie or return it in the response
    // This depends on your application's specific authentication mechanism
    return { token: jwtToken };
  }
}
