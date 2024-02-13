import { Body, Controller, Post } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  createGender(@Body() body: CreateGenderDto) {
    return this.genderService.createGender(body);
  }
}
