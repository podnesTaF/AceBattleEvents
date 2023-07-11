const nextConfig = {
  env: {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
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
