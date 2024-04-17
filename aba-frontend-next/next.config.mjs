/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PLATFORM_URL: process.env.PLATFORM_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  images: {
    domains: ["localhost", "placeimg.com"],
  },
};

export default nextConfig;

