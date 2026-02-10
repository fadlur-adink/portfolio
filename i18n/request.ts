import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	// Static export defaults to 'en'
	const locale = "en";

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
