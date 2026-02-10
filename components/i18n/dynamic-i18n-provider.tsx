"use client";

import { useEffect, useState } from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { useSettings } from "@/contexts/settings-context";

export function DynamicI18nProvider({
	children,
	initialMessages,
	initialLocale,
}: {
	children: React.ReactNode;
	initialMessages: AbstractIntlMessages;
	initialLocale: string;
}) {
	const { settings } = useSettings();
	const [messages, setMessages] = useState(initialMessages);

	useEffect(() => {
		async function loadMessages() {
			// If the language matches the initially loaded one (e.g. 'en'), 
            // we could potentially use initialMessages, but fetching ensures consistency
            // if we navigated away and back.
            // However, checking against initialLocale saves a network request on first load.
            if (settings.language === initialLocale && messages === initialMessages) {
                return; 
            }

			try {
				const msgs = (await import(`../../messages/${settings.language}.json`)).default;
				setMessages(msgs);
			} catch (error) {
				console.error("Failed to load messages", error);
			}
		}
		loadMessages();
	}, [settings.language, initialLocale, initialMessages, messages]);

	return (
		<NextIntlClientProvider locale={settings.language} messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}
