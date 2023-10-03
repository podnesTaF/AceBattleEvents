import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private countryService: CountryService,
  ) {}

  create(dto: any) {
    return this.repository.save({ ...dto });
  }

  findAll() {
    return this.repository.find({
      select: ['id', 'name', 'surname', 'email', 'city', 'country'],
    });
  }

  updateImage(id: number, imageId: number) {
    return this.repository.update(id, { image: { id: imageId } });
  }

  async findById(id: number) {
    const user = await this.repository.findOne({
      where: { id },
      relations: [
        'image',
        'country',
        'runner',
        'runner.personalBests',
        'runner.results',
        'runner.club',
        'manager',
        'manager.club',
        'spectator',
        'spectator.favoriteClubs',
      ],
    });
    return user;
  }

  async findByCond(cond: LoginUserDto) {
    const query = this.repository
      .createQueryBuilder('user')
      .where({ ...cond })
      .leftJoinAndSelect('user.image', 'image');

    const userPreview = await query.getOne();

    if (userPreview.role === 'runner') {
      query.leftJoinAndSelect('user.runner', 'runner');
      query.leftJoinAndSelect('runner.club', 'club');
    } else if (userPreview.role === 'manager') {
      query.leftJoinAndSelect('user.manager', 'manager');
      query.leftJoinAndSelect('manager.club', 'club');
    }

    const user = await query.getOne();

    if (user) {
      const club = user[user.role]?.club || null;
      const clubId = club?.id;

      user[user.role] = null;
      return { ...user, clubId };
    }

    return null;
  }

  async count() {
    const count = await this.repository.count();
    return { 'Total users': count };
  }

  update(id: number, dto: User) {
    return this.repository.update(id, { ...dto });
  }

  async updateProfileData(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id } });

    let newCountry: Country;
    if (dto.country) {
      const countryIfExist = await this.countryService.returnIfExist({
        name: dto.country,
      });
      if (countryIfExist) {
        newCountry = countryIfExist;
      } else {
        newCountry = await this.countryService.create(dto.country);
      }
    }

    user.city = dto.city || user.city;
    user.country = newCountry || user.country;
    user.name = dto.name || user.name;
    user.image = dto.image || user.image;
    user.surname = dto.surname || user.surname;

    return this.repository.save(user);
  }

  async changePassword(
    id: number,
    dto: { oldPassword: string; newPassword: string; confirmPassword: string },
  ) {
    if (dto.newPassword !== dto.confirmPassword || dto.newPassword.length < 6) {
      throw new ForbiddenException('Error Changing password');
    }
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      const isEqual = await bcrypt.compare(dto.oldPassword, user.password);
      if (isEqual) {
        const password = await bcrypt.hash(dto.newPassword, 10);
        return this.updatePassword(id, password);
      }
    }
    return null;
  }

  updatePassword(id: number, password: string) {
    return this.repository.update(id, { password });
  }
}
