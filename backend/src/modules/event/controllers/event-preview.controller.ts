import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { UpdateEventPreviewDto } from '../dto/event-preview.dto';
import { EventPreviewService } from '../services/event-preview.service';

@Controller('event-previews')
export class EventPreviewController {
  constructor(private readonly eventPreviewService: EventPreviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(
    @Body()
    dto: {
      title: string;
      season: string;
      introImageUrl?: string;
      description?: string;
      date?: Date;
      locationInfo?: string;
    },
  ) {
    return this.eventPreviewService.create(dto);
  }

  // edit
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'introImage', maxCount: 1 }], {
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  async updateEventPreview(
    @UploadedFiles()
    files: {
      introImage?: Express.Multer.File[];
    },
    @Body() dto: UpdateEventPreviewDto,
    @Param('id') id: number,
  ) {
    return this.eventPreviewService.updateEventPreview(id, {
      ...dto,
      introImage: files?.introImage?.[0],
    });
  }

  @Get()
  findAll(@Query() queries: { announced: boolean }) {
    return this.eventPreviewService.getAll(queries);
  }
}
