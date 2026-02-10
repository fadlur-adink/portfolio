"use client";

import { Box, Typography, IconButton, Zoom } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useWindowManager } from "@/contexts/window-manager-context";
import { TransitionGroup } from "react-transition-group";

export function Dock() {
	const { state, restoreWindow, getApp, minimizeWindow, focusWindow } =
		useWindowManager();
	const theme = useTheme();

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
			sx={{
				position: "fixed",
				bottom: 16,
				left: "50%",
				transform: "translateX(-50%)",
				display: "flex",
				gap: 1,
				padding: "8px 12px",
				backgroundColor: `${theme.palette.background.paper}ee`,
				backdropFilter: "blur(10px)",
				borderRadius: "16px",
				border: `1px solid ${theme.palette.divider}`,
				boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
							style={{ transitionDelay: "50ms" }}
						>
							<Box>
								<IconButton
									onClick={() =>
										handleWindowClick(
											window.id,
											window.isMinimized,
											window.isFocused,
										)
									}
									sx={{
										width: 48,
										height: 48,
										borderRadius: "12px",
										backgroundColor: isActive
											? theme.palette.background.paper
											: theme.palette.background.default,
										border: `1px solid ${isActive ? theme.palette.primary.main : theme.palette.divider}`,
										boxShadow: isActive
											? `0 0 10px ${theme.palette.primary.main}40`
											: "none",
										transition:
											"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
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
												bottom: -6,
												width: window.isFocused
													? 12
													: 4,
												height: 4,
												borderRadius: 12,
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
