"use client";

import { useEffect, useState } from "react";
import { NextIntlClientProvider, type AbstractIntlMessages, type Locale } from "next-intl";
import { useSettings } from "@/contexts/settings-context";

export function DynamicI18nProvider({
	children,
	initialMessages,
	initialLocale,
}: {
	children: React.ReactNode;
	initialMessages: AbstractIntlMessages;
	initialLocale: Locale;
}) {
	const { settings, isHydrated, updateSettings } = useSettings();
	const [translation, setTranslation] = useState({
		locale: initialLocale,
		messages: initialMessages,
	});

	useEffect(() => {
		if (!isHydrated) return;
		let cancelled = false;

		async function loadMessages() {
			if (settings.language === initialLocale) {
				setTranslation({ locale: initialLocale, messages: initialMessages });
				return;
			}

			try {
				const messages = (await import(`../../messages/${settings.language}.json`)).default;
				if (!cancelled) {
					setTranslation({ locale: settings.language, messages });
				}
			} catch (error) {
				if (cancelled) return;
				console.error("Failed to load messages; using the default language", error);
				setTranslation({ locale: initialLocale, messages: initialMessages });
				updateSettings({ language: initialLocale });
			}
		}

		void loadMessages();
		return () => { cancelled = true; };
	}, [settings.language, isHydrated, initialLocale, initialMessages, updateSettings]);

	useEffect(() => {
		document.documentElement.lang = translation.locale;
	}, [translation.locale]);

	return (
		<NextIntlClientProvider
			locale={translation.locale}
			messages={translation.messages}
			timeZone="UTC"
		>
			{children}
		</NextIntlClientProvider>
	);
}
