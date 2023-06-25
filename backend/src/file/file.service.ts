import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import * as uuid from 'uuid';

export enum FileType {
  IMAGE = 'image',
  AVATAR = 'avatar',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file: any): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4().toString() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const largeFilePath = path.resolve(filePath, 'large');
      if (!fs.existsSync(largeFilePath)) {
        fs.mkdirSync(largeFilePath, { recursive: true });
      }

      const smallFilePath = path.resolve(filePath, 'small');
      if (!fs.existsSync(smallFilePath)) {
        fs.mkdirSync(smallFilePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(largeFilePath, fileName), file.buffer);

      // Create a smaller version of the image for preview
      const smallFileName = 'small_' + fileName;
      sharp(file.buffer)
        .resize(200, 200) // Adjust the desired dimensions for the small image
        .toFile(path.resolve(smallFilePath, smallFileName));

      return type + '/large/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getAllSmallImages(): string[] {
    try {
      const smallFilePath = path.resolve(
        __dirname,
        '..',
        'static',
        FileType.IMAGE,
        'small',
      );
      if (fs.existsSync(smallFilePath)) {
        return fs.readdirSync(smallFilePath);
      }
      return [];
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteFile(imagePath: string): boolean {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
