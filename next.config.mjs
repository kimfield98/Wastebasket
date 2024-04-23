/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname:
          '/kimfield98/MYPJT3-BOBBUDDY/blob/main/public/%EB%B0%A5%EB%B2%84%EB%94%94.png',
      },
    ],
  },
};

export default nextConfig;
