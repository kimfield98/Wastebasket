/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'cdn.icon-icons.com',
      },
    ],
  },
};

export default nextConfig;
