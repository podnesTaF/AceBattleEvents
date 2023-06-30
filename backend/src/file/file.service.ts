import { Storage } from '@google-cloud/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import * as uuid from 'uuid';
import { googleCloudStorageConfig } from './google-cloud-storage.config';

export enum FileType {
  IMAGE = 'image',
  AVATAR = 'avatar',
}

const bucketBaseUrl =
  'https://storage.googleapis.com/' + googleCloudStorageConfig.bucketName;

@Injectable()
export class FileService {
  async uploadFileToStorage(
    type: FileType,
    file: any,
    storage: Storage,
  ): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4().toString() + '.' + fileExtension;

      const bucket = storage.bucket(googleCloudStorageConfig.bucketName);

      const fileUpload = bucket.file(`${type}/large/${fileName}`);
      const stream = fileUpload.createWriteStream({
        resumable: false,
        gzip: true,
      });

      stream.on('error', (error) => {
        throw new Error(`Error uploading file: ${error}`);
      });

      stream.on('finish', () => {
        console.log(`File uploaded successfully: ${fileName}`);
      });

      stream.end(file.buffer);

      // Create a smaller version of the image for preview
      const smallFileName = 'small_' + fileName;
      const smallFileBuffer = await sharp(file.buffer)
        .resize(200, 200)
        .toBuffer();

      const smallFileUpload = bucket.file(`${type}/small/${smallFileName}`);
      const smallStream = smallFileUpload.createWriteStream({
        resumable: false,
        gzip: true,
      });

      smallStream.on('error', (error) => {
        throw new Error(`Error uploading small file: ${error}`);
      });

      smallStream.on('finish', () => {
        console.log(`Small file uploaded successfully: ${smallFileName}`);
      });

      smallStream.end(smallFileBuffer);

      return `${bucketBaseUrl}/${type}/small/${smallFileName}`;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllSmallImagesFromStorage(storage: Storage): Promise<string[]> {
    try {
      const bucket = storage.bucket(googleCloudStorageConfig.bucketName);

      const [files] = await bucket.getFiles({ prefix: 'image/small/' });

      return files.map((file) => bucketBaseUrl + '/' + file.name);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFileFromStorage(
    imagePath: string,
    storage: Storage,
  ): Promise<boolean> {
    try {
      const bucket = storage.bucket(googleCloudStorageConfig.bucketName);
      const file = bucket.file(imagePath);

      await file.delete();

      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
