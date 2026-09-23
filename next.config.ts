import type { NextConfig } from "next";

/**
 * BUILD_STATIC=1 — сборка статики для GitHub Pages (репозиторий TM_site → basePath /TM_site).
 * Без него — обычный standalone-сервер (локальный превью/прод с API-роутом заявок).
 */
const isStatic = process.env.BUILD_STATIC === "1";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        basePath: "/TM_site",
        assetPrefix: "/TM_site",
        images: { unoptimized: true },
      }
    : { output: "standalone" as const }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
