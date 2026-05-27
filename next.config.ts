import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/yaml-tools",
  images: { unoptimized: true },
};

export default nextConfig;
