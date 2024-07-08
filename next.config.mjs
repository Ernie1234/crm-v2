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
      {
        protocol: "https",
        hostname: "cdni.iconscout.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
