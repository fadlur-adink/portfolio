"use client";

import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	type SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function SettingsSelect({
	label,
	value,
	onChange,
	options,
}: {
	label: string;
	value: string;
	onChange: (e: SelectChangeEvent) => void;
	options: { value: string; label: string }[];
}) {
	const theme = useTheme();

	return (
		<FormControl fullWidth size="small">
			<InputLabel sx={{ color: theme.palette.text.secondary }}>
				{label}
			</InputLabel>
			<Select
				value={value}
				label={label}
				onChange={onChange}
				sx={{
					color: theme.palette.text.primary,
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.divider,
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.primary.main,
					},
				}}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
