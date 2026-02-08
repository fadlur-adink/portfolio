"use client";

import * as React from "react";
import { useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SettingsProvider, useSettings } from "@/contexts/settings-context";
import { createAppTheme } from "@/config/theme";

function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
	const { currentScheme } = useSettings();
	const theme = useMemo(() => createAppTheme(currentScheme), [currentScheme]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AppRouterCacheProvider>
			<SettingsProvider>
				<DynamicThemeProvider>{children}</DynamicThemeProvider>
			</SettingsProvider>
		</AppRouterCacheProvider>
	);
}
