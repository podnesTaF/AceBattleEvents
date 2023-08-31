import { Storage } from '@google-cloud/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import pdfkit from 'pdfkit';
import sharp from 'sharp';
import { Event } from 'src/events/entities/event.entity';
import { Media } from 'src/media/entities/media.entity';
import { MediaService } from 'src/media/media.service';
import { CreateViewerRegistrationDto } from 'src/viewer-registrations/dto/create-viewer-registration.dto';
import * as uuid from 'uuid';
import { googleCloudStorageConfig } from './google-cloud-storage.config';

export enum FileType {
  IMAGE = 'image',
  AVATAR = 'avatar',
  QRCODE = 'qrcode',
}

const bucketBaseUrl =
  'https://storage.googleapis.com/' + googleCloudStorageConfig.bucketName;

@Injectable()
export class FileService {
  constructor(private mediaService: MediaService) {}

  async uploadFileToStorage(
    type: FileType,
    buffer: Buffer,
    fileName: string,
    storage: Storage,
  ): Promise<Media> {
    try {
      const fileExtension = fileName.split('.').pop();
      const fileDBName = uuid.v4().toString() + '.' + fileExtension;

      const bucket = storage.bucket(googleCloudStorageConfig.bucketName);

      const fileUpload = bucket.file(`${type}/large/${fileDBName}`);
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

      stream.end(buffer);

      // Create a smaller version of the image for preview
      const smallFileName = 'small_' + fileDBName;
      const smallFileBuffer = await sharp(buffer).resize(200, 200).toBuffer();

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

      return this.mediaService.create({
        title: fileName,
        mediaUrl: `${bucketBaseUrl}/${type}/large/${fileDBName}`,
        smallUrl: `${bucketBaseUrl}/${type}/small/${smallFileName}`,
        mediaType: type,
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generatePDFforViewer(
    event: Event,
    viewer: CreateViewerRegistrationDto,
    qr: Media,
    storage: Storage,
  ): Promise<string> {
    const pdfFileName = `pdfs/${event.title}_${viewer.firstName}_${viewer.lastName}.pdf`;
    const imageUrl = `${bucketBaseUrl}/image/large/016da8c1-f6b3-4f8b-a809-beef76b82202.jpeg`;
    const bucket = storage.bucket(googleCloudStorageConfig.bucketName);
    const file = bucket.file(pdfFileName);
    const doc = new pdfkit();

    // Add event information
    doc.text(`Event: ${event.title}`);
    doc.text(
      `Location: ${event.location.address}, ${event.location.city}, ${event.location.country.name}`,
    );
    doc.text(`Start Date and Time: ${event.startDateTime}`);

    // Add viewer information
    doc.text(`Viewer Information:`);
    doc.text(`First Name: ${viewer.firstName}`);
    doc.text(`Last Name: ${viewer.lastName}`);
    doc.text(`Email: ${viewer.email}`);
    doc.text(`Gender: ${viewer.gender}`);

    // Add logo if available (replace the URL with your actual logo URL)

    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    const imageBuffer = Buffer.from(imageResponse.data);

    doc.image(imageBuffer, { width: 200 });

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const buffers: Uint8Array[] = [];
      doc.on('data', (chunk: any) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
    });

    await file.save(pdfBuffer);
    await file.makePublic();

    return file.publicUrl();
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
    mediaId: number,
  ): Promise<boolean> {
    try {
      const bucket = storage.bucket(googleCloudStorageConfig.bucketName);
      const file = bucket.file(imagePath);

      await file.delete();

      await this.mediaService.deleteMedia(mediaId);

      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
