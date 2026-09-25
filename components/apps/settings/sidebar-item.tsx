"use client";

import { ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";

export function SidebarItem({
	icon,
	label,
	isActive,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	isActive: boolean;
	onClick: () => void;
}) {
	const theme = useTheme();
	return (
		<ListItemButton
			selected={isActive}
			onClick={onClick}
			sx={{
				mx: 1,
				borderRadius: "2px",
				mb: 1,
				border: "1px solid transparent",
				"&.Mui-selected": {
					borderColor: theme.palette.retro.ink,
					boxShadow: theme.palette.retro.bevel,
					backgroundColor: "primaryLight",
					"&:hover": { backgroundColor: "primaryLight" },
				},
				"&:hover": { backgroundColor: "primaryLight" },
			}}
		>
			<ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
				{icon}
			</ListItemIcon>
			<ListItemText
				primary={label}
				slotProps={{
					primary: {
						fontSize: "0.875rem",
						color: "text.primary",
					},
				}}
			/>
		</ListItemButton>
	);
}
