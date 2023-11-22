import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMediaDto } from './dto/createMedia.dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Get('/images')
  getAllImages() {
    return this.mediaService.findAllImages();
  }

  @Delete(':id')
  deleteImage(@Param('id') id: string) {
    return this.mediaService.deleteMedia(+id);
  }
}