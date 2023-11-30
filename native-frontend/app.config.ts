import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Ace Battle Mile",
  slug: "ABM",
  ios: {
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    package: "com.acebattlemile.abm",
  },
  extra: {
    eas: {
      projectId: "651169ca-267e-4328-bd6c-bed8a3d04565",
    },
  },
});
