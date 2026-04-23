/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.adidas.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "img.lazcdn.com" },
      { protocol: "https", hostname: "www.static-src.com" },
      { protocol: "https", hostname: "down-id.img.susercontent.com" },
      { protocol: "https", hostname: "images.puma.com" },
    ],
  },
};

module.exports = nextConfig;