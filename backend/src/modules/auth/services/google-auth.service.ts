import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { RequestRole } from 'src/modules/users/decorators/user.decorator';
import { UserService } from 'src/modules/users/services/user.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateGoogleUser(token: string): Promise<any> {
    const userProfile = await this.validateGoogleToken(token);
    // Here you would use the Google token to verify the user's identity with Google's API.
    // This might involve calling Google's token info endpoint or using a Google client library.
    const userRecord = await this.userService.findByCond({
      email: userProfile.email,
    });

    if (userRecord) {
      const roles = userRecord.roles.map((userRole) => ({
        id: userRole.role.id,
        name: userRole.role.name,
        active: userRole.active,
      }));

      const jwtToken = this.generateJwtToken({
        id: userRecord.id,
        email: userRecord.email,
        roles: roles,
      });
      return {
        id: userRecord.id,
        email: userRecord.email,
        roles: roles,
        token: jwtToken,
      };
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

  generateJwtToken(data: { id: number; email: string; roles: RequestRole[] }) {
    const payload = { email: data.email, id: data.id, roles: data.roles };
    return this.jwtService.sign(payload);
  }
}
