import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "native-frontend",
  slug: "native-frontend",
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
      projectId: "bef26d41-b904-4af6-9912-c32537733442",
    },
  },
});
