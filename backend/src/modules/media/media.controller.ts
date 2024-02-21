import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from 'src/modules/file/file.service';
import { StorageFile } from 'src/modules/file/types/file';

@Controller('media')
export class MediaController {
  constructor(private storageService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 4 * 1024 * 1024,
      },
    }),
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() { prefix }: { prefix: string },
  ) {
    const url = await this.storageService.uploadFileToStorage(
      file.originalname,
      prefix,
      file.mimetype,
      file.buffer,
      [{ mediaName: file.originalname }],
    );

    return { mediaUrl: url };
  }

  @Get('/*')
  async downloadMedia(@Param('0') path: string, @Res() res: Response) {
    let storageFile: StorageFile;
    try {
      storageFile = await this.storageService.getWithMetaData(path);
    } catch (e) {
      if (e.message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }

    res.setHeader('Content-Type', storageFile.contentType);
    res.setHeader('Cache-Control', 'max-age=60d');
    res.end(storageFile.buffer);
  }
}
