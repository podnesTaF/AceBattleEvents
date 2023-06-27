import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService, FileType } from './file.service';
import { storage } from './google-cloud-storage.config';

@Controller('images')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: any): Promise<{ imagePath: string }> {
    const imagePath = await this.fileService.uploadFileToStorage(
      FileType.IMAGE,
      file,
      storage,
    );
    return { imagePath };
  }

  @Delete(':imagePath')
  async deleteImage(
    @Param('imagePath') imagePath: string,
  ): Promise<{ success: boolean }> {
    const isDeleted = await this.fileService.deleteFileFromStorage(
      imagePath,
      storage,
    );
    return { success: isDeleted };
  }

  @Get('small')
  async getAllSmallImages(): Promise<{ imagePaths: string[] }> {
    const imagePaths = await this.fileService.getAllSmallImagesFromStorage(
      storage,
    );

    return { imagePaths };
  }
}
