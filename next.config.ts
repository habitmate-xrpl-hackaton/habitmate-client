import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    // XRPL 환경변수를 클라이언트에서 사용 가능하도록 설정
    NEXT_PUBLIC_ADMIN_SEED: process.env.ADMIN_SEED,
    NEXT_PUBLIC_USER_SEED: process.env.USER_SEED,
    NEXT_PUBLIC_ADMIN_ADDRESS: process.env.ADMIN_ADDRESS,
    NEXT_PUBLIC_USER_ADDRESS: process.env.USER_ADDRESS,
  },
  webpack: (config, { webpack }) => {
    // Buffer 폴리필 추가
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: "buffer",
    };

    // Buffer를 글로벌로 사용 가능하게 설정
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      })
    );

    return config;
  },
};

export default nextConfig;
