import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
  ) {}

  async createGender(dto: CreateGenderDto): Promise<Gender> {
    const gender = await this.genderRepository.save(dto);
    return gender;
  }

  async findByCond(cond: { [key: string]: any }): Promise<Gender> {
    return await this.genderRepository.findOne({ where: cond });
  }

  async findAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }
}
