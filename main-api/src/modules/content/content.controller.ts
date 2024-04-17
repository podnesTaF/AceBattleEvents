import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles-auth.decorator';
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
  @Roles('admin')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'media', maxCount: 1 }]))
  create(
    @Body() createContentDto: CreateContentDto,
    @UploadedFiles()
    files: { media?: Express.Multer.File[] },
  ) {
    return this.contentService.createContent(
      createContentDto,
      files.media?.[0],
    );
  }

  // edit content

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Body() createContentDto: UpdateContentDto, @Param('id') id: number) {
    return this.contentService.updateContent(id, createContentDto);
  }
}
