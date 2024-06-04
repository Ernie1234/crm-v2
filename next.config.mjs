/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.linkpoint360.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "as2.ftcdn.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cms.podium.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
