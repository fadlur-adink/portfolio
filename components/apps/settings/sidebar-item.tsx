import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

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
	return (
		<ListItemButton
			selected={isActive}
			onClick={onClick}
			sx={{
				mx: 1,
				borderRadius: 1,
				"&.Mui-selected": {
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
