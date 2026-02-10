"use client";

import { useState, useRef, useEffect } from "react";
import { Box, List, IconButton, Typography } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(800);

	useEffect(() => {
		if (!containerRef.current) return;
		const observer = new ResizeObserver((entries) => {
			if (entries[0].contentRect) {
				setWidth(entries[0].contentRect.width);
			}
		});
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);

	const isMobile = width < 600;
	const [showSidebar, setShowSidebar] = useState(true);

	useEffect(() => {
		if (!isMobile) {
			setShowSidebar(true);
		}
	}, [isMobile]);

	const handleSidebarClick = (tab: SettingsTab) => {
		setActiveTab(tab);
		if (isMobile) {
			setShowSidebar(false);
		}
	};

	return (
		<Box
			ref={containerRef}
			sx={{
				display: "flex",
				height: "100%",
				minHeight: 400,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Sidebar */}
			<Box
				sx={{
					width: isMobile ? "100%" : 200,
					borderRight: isMobile ? "none" : `1px solid ${theme.palette.divider}`,
					backgroundColor: theme.palette.background.default,
					display: isMobile && !showSidebar ? "none" : "block",
					flexShrink: 0,
					height: "100%",
					zIndex: 1,
				}}
			>
				<List sx={{ py: 1 }}>
					<SidebarItem
						icon={<PaletteIcon sx={{ fontSize: 20 }} />}
						label={t("appearance")}
						isActive={activeTab === "appearance"}
						onClick={() => handleSidebarClick("appearance")}
					/>
					<SidebarItem
						icon={<InfoIcon sx={{ fontSize: 20 }} />}
						label={t("about")}
						isActive={activeTab === "about"}
						onClick={() => handleSidebarClick("about")}
					/>
				</List>
			</Box>

			{/* Content Area */}
			<Box
				sx={{
					flex: 1,
					display: isMobile && showSidebar ? "none" : "flex",
					flexDirection: "column",
					overflow: "hidden",
					backgroundColor: theme.palette.background.paper,
					height: "100%",
				}}
			>
				{isMobile && (
					<Box
						sx={{
							p: 1,
							display: "flex",
							alignItems: "center",
							borderBottom: `1px solid ${theme.palette.divider}`,
							backgroundColor: theme.palette.background.paper,
						}}
					>
						<IconButton
							onClick={() => setShowSidebar(true)}
							size="small"
							sx={{ mr: 1 }}
						>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant="subtitle1" fontWeight="bold">
							{t(activeTab)}
						</Typography>
					</Box>
				)}

				<Box sx={{ flex: 1, overflow: "auto" }}>
					{activeTab === "appearance" && <AppearancePanel />}
					{activeTab === "about" && <AboutPanel />}
				</Box>
			</Box>
		</Box>
	);
}
