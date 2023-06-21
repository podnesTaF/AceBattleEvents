import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({
      email,
    });
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: User) {
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const { password, ...userData } = await this.userService.create({
        email: dto.email,
        name: dto.name,
        surname: dto.surname,
        city: dto.city,
        country: dto.country,
        password: hashedPassword,
        imageUrl: dto.imageUrl,
      });
      return {
        ...userData,
        token: this.generateJwtToken(userData),
      };
    } catch (err) {
      throw new ForbiddenException('Register error');
    }
  }
}
