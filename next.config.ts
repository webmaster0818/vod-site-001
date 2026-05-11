import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Cloudflare Pages用: 静的HTMLエクスポート
  images: {
    unoptimized: true, // Cloudflare Pagesでは画像最適化を無効化
  },
};

export default nextConfig;
// rebuild trigger 1778508049
