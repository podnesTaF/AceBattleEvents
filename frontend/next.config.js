const nextConfig = {
  env: {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
