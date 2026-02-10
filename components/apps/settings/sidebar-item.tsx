"use client";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
				borderRadius: 1,
				"&.Mui-selected": {
					backgroundColor: theme.palette.primaryLight,
					"&:hover": { backgroundColor: theme.palette.primaryLight },
				},
				"&:hover": { backgroundColor: theme.palette.primaryLight },
			}}
		>
			<ListItemIcon sx={{ minWidth: 36, color: theme.palette.primary.main }}>
				{icon}
			</ListItemIcon>
			<ListItemText
				primary={label}
				primaryTypographyProps={{
					fontSize: "0.875rem",
					color: theme.palette.text.primary,
				}}
			/>
		</ListItemButton>
	);
}
