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
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateLocationDto } from './dto/create-location.dto';
import { EditLocationDto } from './dto/edit-location.dto';
import { LocationService } from './location.service';

@ApiTags('events', 'locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // create location
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'placeImage', maxCount: 1 }], {
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  createLocation(
    @Body() dto: CreateLocationDto,
    @UploadedFiles()
    files: { placeImage?: Express.Multer.File[] },
  ) {
    return this.locationService.createLocation(dto, files.placeImage?.[0]);
  }

  // edit location
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'placeImage', maxCount: 1 }], {
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  updateLocation(
    @Body() dto: EditLocationDto,
    @Param('id') id: number,
    @UploadedFiles()
    files?: { placeImage?: Express.Multer.File[] },
  ) {
    return this.locationService.updateLocation(id, dto, files?.placeImage?.[0]);
  }
}
