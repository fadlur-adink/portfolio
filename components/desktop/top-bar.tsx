"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography, ClickAwayListener, keyframes } from "@mui/material";
import { colors } from "@/config/colors";
import { siteConfig } from "@/config/site";

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

function AnalogClock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	const seconds = time.getSeconds();
	const minutes = time.getMinutes();
	const hours = time.getHours() % 12;

	const secondDeg = seconds * 6;
	const minuteDeg = minutes * 6 + seconds * 0.1;
	const hourDeg = hours * 30 + minutes * 0.5;

	return (
		<Box
			sx={{
				width: 180,
				height: 180,
				borderRadius: "50%",
				backgroundColor: colors.background.default,
				border: `3px solid ${colors.primary.main}`,
				position: "relative",
				margin: "0 auto",
			}}
		>
			{[...Array(12)].map((_, i) => (
				<Box
					key={i}
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: 2,
						height: i % 3 === 0 ? 12 : 6,
						backgroundColor:
							i % 3 === 0
								? colors.text.primary
								: colors.text.secondary,
						transformOrigin: "center 78px",
						transform: `translate(-50%, -78px) rotate(${i * 30}deg)`,
					}}
				/>
			))}

			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: 4,
					height: 50,
					backgroundColor: colors.text.primary,
					borderRadius: 2,
					transformOrigin: "center bottom",
					transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
					transition: "transform 0.1s ease-out",
				}}
			/>

			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: 3,
					height: 65,
					backgroundColor: colors.text.primary,
					borderRadius: 2,
					transformOrigin: "center bottom",
					transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
					transition: "transform 0.1s ease-out",
				}}
			/>

			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: 2,
					height: 70,
					backgroundColor: colors.primary.main,
					borderRadius: 1,
					transformOrigin: "center bottom",
					transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
				}}
			/>

			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: 10,
					height: 10,
					backgroundColor: colors.primary.main,
					borderRadius: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>
		</Box>
	);
}

function Calendar() {
	const [currentDate] = useState(new Date());
	const today = new Date();

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const monthName = currentDate.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
	const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	const days: (number | null)[] = [];
	for (let i = 0; i < firstDay; i++) {
		days.push(null);
	}
	for (let i = 1; i <= daysInMonth; i++) {
		days.push(i);
	}

	return (
		<Box sx={{ width: 240 }}>
			<Typography
				variant="subtitle2"
				sx={{
					textAlign: "center",
					color: colors.text.primary,
					fontWeight: 600,
					mb: 2,
				}}
			>
				{monthName}
			</Typography>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(7, 1fr)",
					gap: 0.5,
					mb: 1,
				}}
			>
				{weekDays.map((day) => (
					<Typography
						key={day}
						variant="caption"
						sx={{
							textAlign: "center",
							color: colors.text.secondary,
							fontWeight: 600,
							fontSize: "0.65rem",
						}}
					>
						{day}
					</Typography>
				))}
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(7, 1fr)",
					gap: 0.5,
				}}
			>
				{days.map((day, index) => {
					const isToday =
						day === today.getDate() &&
						month === today.getMonth() &&
						year === today.getFullYear();

					return (
						<Box
							key={index}
							sx={{
								aspectRatio: "1",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: "50%",
								backgroundColor: isToday
									? colors.primary.main
									: "transparent",
								cursor: day ? "pointer" : "default",
								"&:hover": day
									? {
											backgroundColor: isToday
												? colors.primary.dark
												: colors.primary.light,
										}
									: {},
							}}
						>
							{day && (
								<Typography
									variant="caption"
									sx={{
										color: isToday
											? "#fff"
											: colors.text.primary,
										fontWeight: isToday ? 600 : 400,
										fontSize: "0.75rem",
									}}
								>
									{day}
								</Typography>
							)}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}

interface DropdownProps {
	children: React.ReactNode;
	onClose: () => void;
}

function Dropdown({ children, onClose }: DropdownProps) {
	return (
		<ClickAwayListener onClickAway={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: 48,
					right: 0,
					backgroundColor: colors.background.paper,
					border: `1px solid ${colors.divider}`,
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
				color: colors.text.primary,
				fontWeight: 500,
				fontFamily: "monospace",
				cursor: "pointer",
				px: 1,
				py: 0.5,
				borderRadius: 1,
				"&:hover": {
					backgroundColor: colors.primary.light,
				},
			}}
		>
			{time}
		</Typography>
	);
}

function CurrentDate({ onClick }: { onClick: () => void }) {
	const [date, setDate] = useState<string>("");

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
				color: colors.text.primary,
				fontWeight: 500,
				fontFamily: "monospace",
				cursor: "pointer",
				px: 1,
				py: 0.5,
				borderRadius: 1,
				"&:hover": {
					backgroundColor: colors.primary.light,
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

	const handleClockClick = () => {
		setShowCalendar(false);
		setShowClock((prev) => !prev);
	};

	const handleDateClick = () => {
		setShowClock(false);
		setShowCalendar((prev) => !prev);
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				height: 40,
				backgroundColor: colors.background.paper,
				borderBottom: `1px solid ${colors.divider}`,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				px: 2,
				zIndex: 9999,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Typography
					variant="body2"
					sx={{
						color: colors.primary.main,
						fontWeight: 700,
						letterSpacing: "0.05em",
					}}
				>
					{siteConfig.name}
				</Typography>
			</Box>

			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<Box ref={dateRef} sx={{ position: "relative" }}>
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
