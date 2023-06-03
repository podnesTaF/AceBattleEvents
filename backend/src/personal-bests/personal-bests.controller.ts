import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalBestsService } from './personal-bests.service';
import { CreatePersonalBestDto } from './dto/create-personal-best.dto';
import { UpdatePersonalBestDto } from './dto/update-personal-best.dto';

@Controller('personal-bests')
export class PersonalBestsController {
  constructor(private readonly personalBestsService: PersonalBestsService) {}

  @Post()
  create(@Body() createPersonalBestDto: CreatePersonalBestDto) {
    return this.personalBestsService.create(createPersonalBestDto);
  }

  @Get()
  findAll() {
    return this.personalBestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalBestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalBestDto: UpdatePersonalBestDto) {
    return this.personalBestsService.update(+id, updatePersonalBestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalBestsService.remove(+id);
  }
}
