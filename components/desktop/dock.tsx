"use client";

import { Box, IconButton, Zoom } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles";
import { useWindowManager } from "@/contexts/window-manager-context";
import { TransitionGroup } from "react-transition-group";

export function Dock() {
	const { state, restoreWindow, getApp, minimizeWindow, focusWindow } =
		useWindowManager();
	const theme = useTheme();
	const reduceMotion = useReducedMotion();
	const t = useTranslations("Desktop");

	const windows = state.windows;

	if (windows.length === 0) {
		return null;
	}

	const handleWindowClick = (
		windowId: string,
		isMinimized: boolean,
		isFocused: boolean,
	) => {
		if (isMinimized) {
			restoreWindow(windowId);
		} else if (isFocused) {
			minimizeWindow(windowId);
		} else {
			focusWindow(windowId);
		}
	};

	return (
		<Box
			component="nav"
			aria-label={t("taskbar")}
			sx={{
				position: "fixed",
				bottom: 16,
				left: "50%",
				transform: "translateX(-50%)",
				display: "flex",
				gap: 1,
				padding: "8px 12px",
				backgroundColor: theme.palette.retro.surface,
				borderRadius: "4px",
				border: `2px solid ${theme.palette.retro.ink}`,
				boxShadow: `${theme.palette.retro.shadow}, ${theme.palette.retro.bevel}`,
				maxWidth: "calc(100vw - 32px)",
				overflowX: "auto",
				overflowY: "hidden",
				zIndex: 9998,
				transition: "width 0.3s ease",
			}}
		>
			<TransitionGroup style={{ display: "flex", gap: 8 }}>
				{windows.map((window) => {
					const app = getApp(window.appId);
					const isActive = !window.isMinimized;

					return (
						<Zoom
							key={window.id}
							in={true}
							timeout={reduceMotion ? 0 : 160}
						>
							<Box>
								<IconButton
									aria-label={`${window.isMinimized ? t("restore") : window.isFocused ? t("minimize") : t("restore")} ${window.title}`}
									aria-pressed={window.isFocused}
									onPointerDown={(e) => {
										if (e.button !== 0) return;
										e.preventDefault();
										handleWindowClick(window.id, window.isMinimized, window.isFocused);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleWindowClick(window.id, window.isMinimized, window.isFocused);
										}
									}}
									sx={{
										width: 48,
										height: 48,
										borderRadius: "2px",
										backgroundColor: isActive
											? theme.palette.background.paper
											: theme.palette.background.default,
										border: `2px solid ${theme.palette.retro.ink}`,
										boxShadow: window.isFocused ? `inset 2px 2px 0 ${theme.palette.divider}` : theme.palette.retro.bevel,
										transition: "transform 120ms steps(2)",
										position: "relative",
										"&:hover": {
											backgroundColor:
												theme.palette.action.hover,
											transform: "translateY(-4px)",
										},
										"& svg": {
											fontSize: 24,
											color: isActive
												? theme.palette.primary.main
												: theme.palette.text.secondary,
										},
									}}
									title={window.title}
								>
									{app?.icon}
									{isActive && (
										<Box
											sx={{
												position: "absolute",
												bottom: 3,
												width: window.isFocused
													? 12
													: 4,
												height: 4,
												borderRadius: 0,
												backgroundColor:
													theme.palette.primary.main,
											}}
										/>
									)}
								</IconButton>
							</Box>
						</Zoom>
					);
				})}
			</TransitionGroup>
		</Box>
	);
}
