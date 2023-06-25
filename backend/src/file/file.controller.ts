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

@Controller('images')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: any): { imagePath: string } {
    const imagePath = this.fileService.createFile(FileType.IMAGE, file);
    return { imagePath };
  }

  @Delete(':imagePath')
  deleteImage(@Param('imagePath') imagePath: string): { success: boolean } {
    const isDeleted = this.fileService.deleteFile(imagePath);
    return { success: isDeleted };
  }

  @Get('small')
  getAllSmallImages(): { imagePaths: string[] } {
    const imagePaths = this.fileService.getAllSmallImages();
    return { imagePaths };
  }
}
