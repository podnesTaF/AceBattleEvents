import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@ApiTags('contents')
@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // add content for event or for article
  @Post()
  @UseGuards(RolesGuard)
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.createContent(createContentDto);
  }

  // edit content

  @Patch(':id')
  @UseGuards(RolesGuard)
  update(@Body() createContentDto: UpdateContentDto, @Param('id') id: number) {
    return this.contentService.updateContent(id, createContentDto);
  }
}
