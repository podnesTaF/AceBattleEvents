import { DownloadResponse, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { StorageFile } from './types/file';

@Injectable()
export class FileService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
      },
    });

    this.bucket = process.env.STORAGE_MEDIA_BUCKET;
  }

  private setPrefix(prefix: string): string {
    let escDestination = '';
    escDestination += prefix.replace(/^\.+/g, '').replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  async uploadFileToStorage(
    mediaName: string,
    prefix: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[],
    replaceName?: string,
  ): Promise<string> {
    if (replaceName) await this.delete(this.setPrefix(prefix) + replaceName);

    return new Promise((resolve, reject) => {
      const object = metadata.reduce(
        (obj, item) => Object.assign(obj, item),
        {},
      );
      object.contentType = contentType;
      const path = this.setPrefix(prefix) + mediaName;
      const file = this.storage.bucket(this.bucket).file(path);
      const stream = file.createWriteStream({
        resumable: false,
        gzip: true,
        metadata: {
          metadata: object,
          contentType,
        },
      });

      stream.on('error', (error) => {
        console.error('Stream error:', error);
        reject(error); // Reject the promise on error
      });

      stream.on('finish', async () => {
        try {
          await file.setMetadata({ metadata: object });
          resolve(file.publicUrl()); // Resolve the promise with the public URL
        } catch (error) {
          console.error('Error setting metadata:', error);
          reject(error); // Reject the promise if setting metadata fails
        }
      });

      stream.end(media);
    });
  }

  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [bucketObj] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();

    const { metadata } = bucketObj;
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(
      Object.entries(metadata || {}),
    );
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }
}
