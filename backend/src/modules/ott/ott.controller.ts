import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUser, GetUser } from '../users/decorators/user.decorator';
import { OneTimeTokenService } from './ott.service';

@Controller('ott')
export class OttController {
  constructor(private readonly ottService: OneTimeTokenService) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateOtt(
    @Body() body: { token: string },
    @GetUser() user: AuthenticatedUser,
  ) {
    const jwtToken = body.token;
    const ott = await this.ottService.createToken(user, jwtToken);
    return { ott };
  }

  @Post('/send-verifcation-email')
  sendVerificationEmail(
    @Body()
    dto: {
      email: string;
    },
  ) {
    return this.ottService.sendVerificationEmail(dto);
  }

  @Post('/verify')
  verifyEmail(
    @Body()
    dto: {
      email: string;
      otp: string;
    },
  ) {
    return this.ottService.completeVerification(dto);
  }

  @Post('validate')
  async validateOtt(@Body() body: { ott: string }) {
    const jwtToken = await this.ottService.validateAndRemoveToken(body.ott);
    if (!jwtToken) {
      throw new UnauthorizedException('Invalid or expired OTT');
    }

    return { token: jwtToken };
  }
}
