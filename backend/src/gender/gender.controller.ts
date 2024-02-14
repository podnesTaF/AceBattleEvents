import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
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
}
