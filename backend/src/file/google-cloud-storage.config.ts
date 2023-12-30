import { Storage } from "@google-cloud/storage";
import { googleCloudConfig } from "src/config/google-cloud.config";

export const googleCloudStorageConfig = {
  projectId: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  credentials: {
    ...googleCloudConfig,
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  bucketName: "abe_cloud_storage",
};

export const storage = new Storage({
  projectId: googleCloudStorageConfig.projectId,
  credentials: googleCloudStorageConfig.credentials,
});
