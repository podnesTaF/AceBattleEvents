import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateGenderDto } from './dto/create-gender.dto';
import { GenderService } from './gender.service';

@ApiTags('genders')
@Controller('genders')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  createGender(@Body() body: CreateGenderDto) {
    return this.genderService.createGender(body);
  }

  @Get('/dictionary')
  findAll() {
    return this.genderService.findAll();
  }
}
