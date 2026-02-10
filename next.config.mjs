import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: isProd ? "/portfolio" : "",
	output: "export",
	images: {
		unoptimized: true,
	},
};

export default withNextIntl(nextConfig);
