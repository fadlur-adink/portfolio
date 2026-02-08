import type messages from "./messages/en.json";

const locales = ["en", "id"] as const;

declare module "next-intl" {
	interface AppConfig {
		Messages: typeof messages;
		Locale: (typeof locales)[number];
	}
}
