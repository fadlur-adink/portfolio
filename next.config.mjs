import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Target is decided at build time (see config/site.ts):
  //   VPS root   -> npm run build        (basePath "")
  //   GH Pages   -> npm run build:pages  (basePath "/portfolio")
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
