import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 dòng này sẽ bỏ qua lỗi ESLint khi build
  },
  // các config khác nếu có...
};

export default nextConfig;
