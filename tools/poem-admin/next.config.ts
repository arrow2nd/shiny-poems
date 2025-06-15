import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ローカル開発用のため、最適化は無効化
  reactStrictMode: true,
  poweredByHeader: false
};

export default nextConfig;

