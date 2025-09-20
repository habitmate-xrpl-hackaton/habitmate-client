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
  // 보안상 XRPL 시드는 클라이언트에 노출하지 않음
  // env: {
  //   // XRPL 환경변수는 서버사이드에서만 사용
  // },
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
