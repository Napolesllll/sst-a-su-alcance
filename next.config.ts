import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: {
    bodySizeLimit: "8mb", // Puedes aumentar a 4mb, 8mb, etc. según lo que necesites
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        pathname: "**",
      },
      // 👉 si luego necesitas más dominios, los agregas aquí
    ],
  },
};

export default nextConfig;
