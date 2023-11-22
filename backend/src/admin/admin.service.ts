import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return this.adminRepository.save(createAdminDto);
  }

  findByEmail(email: string) {
    return this.adminRepository.findOne({ where: { email } });
  }

  findAll() {
    return this.adminRepository.find();
  }

  findOne(id: number) {
    return this.adminRepository.findOne({ where: { id } });
  }

  findByCond(cond: any) {
    return this.adminRepository.findOne({ where: { ...cond } });
  }

  update(id: number, dto: { password: string }) {
    return this.adminRepository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}