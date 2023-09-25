import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BestsService } from './bests.service';
import { CreatePersonalBestDto } from './dto/create-personal-best.dto';
import { UpdatePersonalBestDto } from './dto/update-personal-best.dto';

@Controller('bests')
export class BestsController {
  constructor(private readonly bestsService: BestsService) {}

  @Post()
  create(@Body() createPersonalBestDto: CreatePersonalBestDto) {
    return this.bestsService.create(createPersonalBestDto);
  }

  @Get()
  findAll() {
    return this.bestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalBestDto: UpdatePersonalBestDto,
  ) {
    return this.bestsService.update(+id, updatePersonalBestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bestsService.remove(+id);
  }
}
