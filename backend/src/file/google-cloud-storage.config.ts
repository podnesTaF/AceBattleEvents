import { Storage } from '@google-cloud/storage';

export const googleCloudStorageConfig = {
  projectId: 'acebattleevents',
  keyFilename: 'acebattleevents-36a9978fb0f2.json',
  bucketName: 'abe_cloud_storage',
};

export const storage = new Storage({
  projectId: googleCloudStorageConfig.projectId,
  keyFilename: googleCloudStorageConfig.keyFilename,
});