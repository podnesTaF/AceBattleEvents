const nextConfig = {
  env: {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
  },
  modularizeImports: {
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
  images: {
    domains: [
      "localhost",
      "storage.googleapis.com",
      "abe-server.up.railway.app",
    ],
  },
};

module.exports = nextConfig;
