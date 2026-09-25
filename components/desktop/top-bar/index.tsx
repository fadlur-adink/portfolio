"use client";

import { useState, useEffect, useRef } from "react";
import { Box, ButtonBase, Typography, ClickAwayListener, IconButton, keyframes } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
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
					border: `2px solid ${theme.palette.retro.ink}`,
					borderRadius: "3px",
					boxShadow: `${theme.palette.retro.shadow}, ${theme.palette.retro.bevel}`,
					p: 2,
					animation: `${fadeIn} 0.16s steps(3)`,
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
		<ButtonBase
			onClick={onClick}
			sx={{
				color: theme.palette.text.primary,
				fontWeight: 500,
				fontFamily: "inherit",
				fontSize: "0.7rem",
				border: `1px solid ${theme.palette.divider}`,
				boxShadow: `inset 1px 1px 0 ${theme.palette.divider}`,
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
		</ButtonBase>
	);
}

function CurrentDate({ onClick }: { onClick: () => void }) {
	const [date, setDate] = useState<string>("");
	const theme = useTheme();
	const locale = useLocale();

	useEffect(() => {
		const updateDate = () => {
			const now = new Date();
			setDate(
				now.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
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
	}, [locale]);

	return (
		<ButtonBase
			onClick={onClick}
			sx={{
				color: theme.palette.text.primary,
				fontWeight: 500,
				fontFamily: "inherit",
				fontSize: "0.7rem",
				border: `1px solid ${theme.palette.divider}`,
				boxShadow: `inset 1px 1px 0 ${theme.palette.divider}`,
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
		</ButtonBase>
	);
}

export function TopBar() {
	const [showClock, setShowClock] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);
	const clockRef = useRef<HTMLDivElement>(null);
	const dateRef = useRef<HTMLDivElement>(null);
	const { openWindow } = useWindowManager();
	const theme = useTheme();
	const t = useTranslations("Settings");

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
				backgroundColor: theme.palette.retro.surface,
				borderBottom: `2px solid ${theme.palette.retro.ink}`,
				boxShadow: theme.palette.retro.bevel,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				px: { xs: 1, sm: 2 },
				zIndex: 9999,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
				<ButtonBase aria-label="Welcome" onClick={() => openWindow("welcome")} sx={{ width: 26, height: 26, bgcolor: "primary.main", color: "primary.contrastText", border: `1px solid ${theme.palette.retro.ink}`, boxShadow: theme.palette.retro.bevel, fontWeight: 700, fontSize: "0.65rem" }}>FR</ButtonBase>
				<Typography
					variant="body2"
					sx={{
						color: theme.palette.primary.main,
						fontWeight: 700,
						letterSpacing: "0.02em",
						fontSize: "0.7rem",
						display: { xs: "none", sm: "block" },
					}}
				>
					FadlurOS <Box component="span" sx={{ fontWeight: 400, color: "text.secondary", display: { xs: "none", md: "inline" } }}>/ {siteConfig.name}</Box>
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: theme.palette.primary.main,
						fontWeight: 700,
						letterSpacing: "0.02em",
						fontSize: "0.7rem",
						display: { xs: "block", sm: "none" },
					}}
				>
					FadlurOS
				</Typography>
			</Box>

			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<IconButton
					aria-label={t("title")}
					title={t("appearance")}
					onClick={handleSettingsClick}
					size="small"
					sx={{
						color: theme.palette.text.primary,
						border: `1px solid ${theme.palette.retro.ink}`,
						boxShadow: theme.palette.retro.bevel,
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
