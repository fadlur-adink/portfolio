"use client";

import { useState } from "react";
import { Box, List } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";

import { SidebarItem } from "./settings/sidebar-item";
import { AppearancePanel } from "./settings/appearance-panel";
import { AboutPanel } from "./settings/about-panel";

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

type SettingsTab = "appearance" | "about";

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function SettingsApp() {
	const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");
	const theme = useTheme();
	const t = useTranslations("Settings");

	return (
		<Box sx={{ display: "flex", height: "100%", minHeight: 400 }}>
			{/* Sidebar */}
			<Box
				sx={{
					width: 200,
					borderRight: `1px solid ${theme.palette.divider}`,
					backgroundColor: theme.palette.background.default,
				}}
			>
				<List sx={{ py: 1 }}>
					<SidebarItem
						icon={<PaletteIcon sx={{ fontSize: 20 }} />}
						label={t("appearance")}
						isActive={activeTab === "appearance"}
						onClick={() => setActiveTab("appearance")}
					/>
					<SidebarItem
						icon={<InfoIcon sx={{ fontSize: 20 }} />}
						label={t("about")}
						isActive={activeTab === "about"}
						onClick={() => setActiveTab("about")}
					/>
				</List>
			</Box>

			{/* Content Area */}
			<Box
				sx={{
					flex: 1,
					overflow: "auto",
					backgroundColor: theme.palette.background.paper,
				}}
			>
				{activeTab === "appearance" && <AppearancePanel />}
				{activeTab === "about" && <AboutPanel />}
			</Box>
		</Box>
	);
}
