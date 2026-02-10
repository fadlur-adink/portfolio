"use client";

import * as React from "react";
import { useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SettingsProvider, useSettings } from "@/contexts/settings-context";
import { createAppTheme } from "@/config/theme";
import { AbstractIntlMessages } from "next-intl";
import { DynamicI18nProvider } from "@/components/i18n/dynamic-i18n-provider";

function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
	const { currentScheme, settings } = useSettings();
	const theme = useMemo(
		() => createAppTheme(currentScheme, settings),
		[currentScheme, settings]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default function ThemeRegistry({
	children,
	messages,
	locale,
}: {
	children: React.ReactNode;
	messages: AbstractIntlMessages;
	locale: string;
}) {
	return (
		<AppRouterCacheProvider>
			<SettingsProvider>
				<DynamicI18nProvider initialMessages={messages} initialLocale={locale}>
					<DynamicThemeProvider>{children}</DynamicThemeProvider>
				</DynamicI18nProvider>
			</SettingsProvider>
		</AppRouterCacheProvider>
	);
}
