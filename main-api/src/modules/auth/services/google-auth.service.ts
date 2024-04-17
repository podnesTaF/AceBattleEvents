import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { OneTimeTokenService } from 'src/modules/ott/ott.service';
import { UserService } from 'src/modules/users/services/user.service';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable()
export class GoogleAuthService extends AbstractAuthService {
  constructor(
    protected jwtService: JwtService,
    private userService: UserService,
    protected oneTimeTokenService: OneTimeTokenService,
  ) {
    super(jwtService, oneTimeTokenService);
  }

  async validateGoogleUser(token: string): Promise<any> {
    const userProfile = await this.validateGoogleToken(token);

    const userRecord = await this.userService.findByCond({
      email: userProfile.email,
    });

    if (userRecord) {
      return this.login(userRecord);
    }

    return null;
  }

  async validateGoogleToken(token: string): Promise<TokenPayload> {
    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });

      const payload = ticket.getPayload();
      return payload; // This object contains user details among other token details
    } catch (error) {
      throw new Error('Invalid Google token');
    }
  }
}
