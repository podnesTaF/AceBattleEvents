import {
  Controller,
  Delete,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles.guard';
import { Media } from 'src/media/entities/media.entity';
import { FileService, FileType } from './file.service';
import { storage } from './google-cloud-storage.config';

@Controller('images')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: any): Promise<Media> {
    if (!file) {
      throw new Error('No file provided');
    }

    const image = await this.fileService.uploadFileToStorage(
      FileType.IMAGE,
      file.buffer,
      file.originalname,
      storage,
    );
    return image;
  }

  @Delete(':imagePath')
  async deleteImage(
    @Param('imagePath') imagePath: string,
    @Query('mediaId') mediaId: string,
  ): Promise<{ success: boolean }> {
    const isDeleted = await this.fileService.deleteFileFromStorage(
      imagePath,
      storage,
      +mediaId,
    );
    return { success: isDeleted };
  }

  // @Get('small')
  // async getAllSmallImages(): Promise<{ imagePaths: string[] }> {
  //   const imagePaths = await this.fileService.getAllSmallImagesFromStorage(
  //     storage,
  //   );

  //   return { imagePaths };
  // }
}
