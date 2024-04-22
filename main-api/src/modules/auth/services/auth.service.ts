import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import sgMail from "@sendgrid/mail";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { CreateUserDto } from "../../users/dtos/create-user.dto";
import { User } from "../../users/entities/user.entity";
import { UserService } from "../../users/services/user.service";

import { OneTimeTokenService } from "src/modules/ott/ott.service";
import { ResetUserService } from "src/modules/reset-user/reset-user.service";
import { changePasswordTemplate } from "../utils/getChangePassTemplate";
import { AbstractAuthService } from "./abstract-auth.service";

@Injectable()
export class AuthService extends AbstractAuthService {
  constructor(
    private userService: UserService,
    protected jwtService: JwtService,
    private resetRepository: ResetUserService,
    protected oneTimeTokenService: OneTimeTokenService,
  ) {
    super(jwtService, oneTimeTokenService);
    sgMail.setApiKey(process.env.SEND_GRID_API_K);
  }

  async register(dto: CreateUserDto) {
    const userData = await this.userService.create({
      ...dto,
    });

    return {
      ...userData,
    };
  }

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Partial<User>> {
    const user = await this.userService.findByCond({
      email,
    });
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async setPassword(
    id: number,
    dto: { newPassword: string; confirmPassword: string; token: string },
  ) {
    try {
      if (dto.newPassword !== dto.confirmPassword) {
        throw new ForbiddenException("Passwords do not match");
      }
      const resetUser = await this.resetRepository.findByCond({
        token: dto.token,
      });

      if (!resetUser) {
        throw new ForbiddenException("Reset user not found");
      }

      await this.resetRepository.remove(resetUser.id);

      const hashedPassword = await bcrypt.hash(dto.newPassword, 12);
      await this.userService.updatePassword(id, hashedPassword);
      return { message: "Password changed" };
    } catch (err) {
      throw new ForbiddenException("Set password error");
    }
  }

  async resetPassword(email: string) {
    try {
      const user = await this.userService.findByCond({ email });
      if (!user) {
        throw new ForbiddenException("User with this email does not exist");
      }

      const randomToken = uuid.v4().toString();

      const resetUser = await this.resetRepository.create({
        token: randomToken,
        user,
      });

      if (!resetUser) {
        throw new ForbiddenException("Error creating reset user");
      }

      const msg = {
        to: email,
        from: "info@aba.run",
        subject: "Reset password | Ace Battle Mile",
        html: changePasswordTemplate({
          token: randomToken,
          type: "user",
        }),
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.log("error sending email", error.message);
      }

      return { message: "Email sent" };
    } catch (error) {
      throw new ForbiddenException("Reset password error");
    }
  }
}
