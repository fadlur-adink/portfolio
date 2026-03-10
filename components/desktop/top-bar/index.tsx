"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography, ClickAwayListener, IconButton, keyframes } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";
import { siteConfig } from "@/config/site";
import { useWindowManager } from "@/contexts/window-manager-context";
import AnalogClock from "./analog-clock";
import Calendar from "./calendar";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


interface DropdownProps {
	children: React.ReactNode;
	onClose: () => void;
}

function Dropdown({ children, onClose }: DropdownProps) {
	const theme = useTheme();
	return (
		<ClickAwayListener onClickAway={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: 48,
					right: 0,
					backgroundColor: theme.palette.background.paper,
					border: `1px solid ${theme.palette.divider}`,
					borderRadius: 2,
					boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
					p: 2,
					animation: `${fadeIn} 0.2s ease-out`,
					zIndex: 10000,
				}}
			>
				{children}
			</Box>
		</ClickAwayListener>
	);
}

function Clock({ onClick }: { onClick: () => void }) {
	const [time, setTime] = useState<string>("");
	const theme = useTheme();

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setTime(
				now.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
			);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Typography
			variant="body2"
			onClick={onClick}
			sx={{
				color: theme.palette.text.primary,
				fontWeight: 500,
				fontFamily: "monospace",
				cursor: "pointer",
				px: 1,
				py: 0.5,
				borderRadius: 1,
				"&:hover": {
					backgroundColor: theme.palette.primaryLight,
				},
			}}
		>
			{time}
		</Typography>
	);
}

function CurrentDate({ onClick }: { onClick: () => void }) {
	const [date, setDate] = useState<string>("");
	const theme = useTheme();

	useEffect(() => {
		const updateDate = () => {
			const now = new Date();
			setDate(
				now.toLocaleDateString("id-ID", {
					weekday: "short",
					month: "short",
					day: "numeric",
					year: "numeric",
				}),
			);
		};

		updateDate();
		const interval = setInterval(updateDate, 60000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Typography
			variant="body2"
			onClick={onClick}
			sx={{
				color: theme.palette.text.primary,
				fontWeight: 500,
				fontFamily: "monospace",
				cursor: "pointer",
				px: 1,
				py: 0.5,
				borderRadius: 1,
				"&:hover": {
					backgroundColor: theme.palette.primaryLight,
				},
			}}
		>
			{date}
		</Typography>
	);
}

export function TopBar() {
	const [showClock, setShowClock] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);
	const clockRef = useRef<HTMLDivElement>(null);
	const dateRef = useRef<HTMLDivElement>(null);
	const { openWindow } = useWindowManager();
	const theme = useTheme();

	const handleClockClick = () => {
		setShowCalendar(false);
		setShowClock((prev) => !prev);
	};

	const handleDateClick = () => {
		setShowClock(false);
		setShowCalendar((prev) => !prev);
	};

	const handleSettingsClick = () => {
		openWindow("settings");
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				height: 40,
				backgroundColor: theme.palette.background.paper,
				borderBottom: `1px solid ${theme.palette.divider}`,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				px: { xs: 1, sm: 2 },
				zIndex: 9999,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Typography
					variant="body2"
					sx={{
						color: theme.palette.primary.main,
						fontWeight: 700,
						letterSpacing: "0.05em",
						display: { xs: "none", sm: "block" },
					}}
				>
					{siteConfig.name}
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: theme.palette.primary.main,
						fontWeight: 700,
						letterSpacing: "0.05em",
						display: { xs: "block", sm: "none" },
					}}
				>
					{siteConfig.name
						.split(" ")
						.map((n) => n[0])
						.join("")}
				</Typography>
			</Box>

			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<IconButton
					onClick={handleSettingsClick}
					size="small"
					sx={{
						color: theme.palette.text.secondary,
						"&:hover": {
							backgroundColor: theme.palette.primaryLight,
							color: theme.palette.primary.main,
						},
					}}
				>
					<SettingsIcon sx={{ fontSize: 18 }} />
				</IconButton>

				<Box
					ref={dateRef}
					sx={{ position: "relative", display: { xs: "none", sm: "block" } }}
				>
					<CurrentDate onClick={handleDateClick} />
					{showCalendar && (
						<Dropdown onClose={() => setShowCalendar(false)}>
							<Calendar />
						</Dropdown>
					)}
				</Box>

				<Box ref={clockRef} sx={{ position: "relative" }}>
					<Clock onClick={handleClockClick} />
					{showClock && (
						<Dropdown onClose={() => setShowClock(false)}>
							<AnalogClock />
						</Dropdown>
					)}
				</Box>
			</Box>
		</Box>
	);
}
