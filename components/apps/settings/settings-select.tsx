import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";

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
	return (
		<FormControl fullWidth size="small">
			<InputLabel sx={{ color: "text.secondary" }}>{label}</InputLabel>
			<Select
				value={value}
				label={label}
				onChange={onChange}
				sx={{
					color: "text.primary",
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: "divider",
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "primary.main",
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
