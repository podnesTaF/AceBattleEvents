import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { createDateFromDDMMYYYY } from 'src/utils/date-formater';
import { generateRandomPassword } from 'src/utils/random-password';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private countryService: CountryService,
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
    const payload = { email: data.email, sub: data.id, roles: ['user'] };
    return this.jwtService.sign(payload);
  }

  async login(user: User, role?: string) {
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      let randomPassword: string;
      if (!dto.password) {
        randomPassword = generateRandomPassword();
      }
      const hashedPassword = await bcrypt.hash(dto.password || 'podnes', 10);
      const countryIfExist = await this.countryService.returnIfExist({
        name: dto.country,
      });
      let country: Country | null;
      if (!countryIfExist) {
        country = await this.countryService.create(dto.country);
      } else {
        country = countryIfExist;
      }
      const { password, ...userData } = await this.userService.create({
        email: dto.email,
        name: dto.name,
        surname: dto.surname,
        city: dto.city,
        country,
        password: hashedPassword,
        image: dto.image || null,
        role: dto.role,
        dateOfBirth: createDateFromDDMMYYYY(dto.dateOfBirth),
        worldAthleticsUrl: dto.worldAthleticsUrl || null,
        gender: dto.gender || null,
        club: dto.club || null,
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
