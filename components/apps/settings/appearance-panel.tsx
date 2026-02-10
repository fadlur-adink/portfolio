"use client";

import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { useSettings } from "@/contexts/settings-context";
import { colorSchemes, fontFamilies, fontSizes } from "@/config/settings";
import { SettingsSection } from "./settings-section";
import { SettingsSelect } from "./settings-select";
import { ColorSchemeCard } from "./color-scheme-card";

export function AppearancePanel() {
	const { settings, updateSettings, resetSettings } = useSettings();
	const theme = useTheme();
	const t = useTranslations("Settings");

	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary, mb: 3, fontWeight: 600 }}
			>
				{t("appearance")}
			</Typography>

			<SettingsSection title={t("colorScheme")}>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
						gap: 1.5,
					}}
				>
					{colorSchemes.map((scheme) => (
						<ColorSchemeCard
							key={scheme.id}
							scheme={scheme}
							isSelected={settings.colorScheme === scheme.id}
							onSelect={() => updateSettings({ colorScheme: scheme.id })}
						/>
					))}
				</Box>
			</SettingsSection>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
				<SettingsSelect
					label={t("language")}
					value={settings.language}
					onChange={(e) =>
						updateSettings({ language: e.target.value as "en" | "id" })
					}
					options={[
						{ value: "en", label: "English" },
						{ value: "id", label: "Bahasa Indonesia" },
					]}
				/>

				<SettingsSelect
					label={t("fontSize")}
					value={settings.fontSize}
					onChange={(e) =>
						updateSettings({
							fontSize: e.target.value as "small" | "medium" | "large",
						})
					}
					options={[
						{
							value: "small",
							label: `${t("fontSmall")} (${fontSizes.small.base}px)`,
						},
						{
							value: "medium",
							label: `${t("fontMedium")} (${fontSizes.medium.base}px)`,
						},
						{
							value: "large",
							label: `${t("fontLarge")} (${fontSizes.large.base}px)`,
						},
					]}
				/>

				<SettingsSelect
					label={t("fontFamily")}
					value={settings.fontFamily}
					onChange={(e) =>
						updateSettings({
							fontFamily: e.target.value as keyof typeof fontFamilies,
						})
					}
					options={[
						{ value: "system", label: t("fontSystem") },
						{ value: "mono", label: t("fontMono") },
						{ value: "serif", label: t("fontSerif") },
						{ value: "sans", label: t("fontSans") },
					]}
				/>
			</Box>

			<Button
				variant="outlined"
				onClick={resetSettings}
				sx={{
					color: theme.palette.text.secondary,
					borderColor: theme.palette.divider,
					"&:hover": {
						borderColor: theme.palette.primary.main,
						backgroundColor: theme.palette.primaryLight,
					},
				}}
			>
				{t("reset")}
			</Button>
		</Box>
	);
}
