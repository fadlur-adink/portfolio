"use client";

import { siteConfig } from "@/config/site";
import { useWindowManager } from "@/contexts/window-manager-context";
import heroImage from "@/public/images/hero.png";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function WelcomeApp() {
	const { openWindow } = useWindowManager();
	const theme = useTheme();
	const t = useTranslations("Welcome");
	const retro = theme.palette.retro;

	return (
		<Box
			sx={{
				p: { xs: 2.5, sm: 3.5 },
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
				gap: 2,
			}}
		>
			<Typography variant="caption" sx={{ alignSelf: "flex-start", fontWeight: 700, color: "primary.main", letterSpacing: "0.14em" }}>✳ {t("hello")}</Typography>
			<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 3, width: "100%" }}>
			<Box
				sx={{
					position: "relative",
					width: 112,
					height: 126,
					flexShrink: 0,
					borderRadius: "2px",
					overflow: "hidden",
					backgroundColor: retro.accents[0],
					border: `2px solid ${retro.ink}`,
					boxShadow: `5px 5px 0 ${retro.accents[1]}, 7px 7px 0 ${retro.ink}`,
					transform: "rotate(-3deg)",
				}}
			>
				<Image
					src={heroImage}
					alt={siteConfig.name}
					sizes="112px"
					priority
					fill
					style={{ objectFit: "cover", objectPosition: "top" }}
				/>
			</Box>

			<Box sx={{ flex: "1 1 220px", textAlign: "left" }}>
				<Typography
					component="h1"
					variant="h4"
					sx={{ color: "text.primary", fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1.15 }}
				>
					{siteConfig.name}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: "primary.main", fontWeight: 500, mt: 1.5 }}
				>
					{t("role")}
				</Typography>
				<Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 1.5, lineHeight: 1.7 }}>{t("intro")}</Typography>
			</Box>
			</Box>

			<Typography
				variant="body1"
				sx={{ color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.85, textAlign: "left", width: "100%", mt: 1 }}
			>
				Recently, I’ve been diving into vibe coding and AI automation,
				experimenting with how AI can enhance the development process—
				from faster prototyping to cleaner, more maintainable code.
			</Typography>

			<Box
				sx={{
					p: 1.5,
					width: "100%",
					border: `1px solid ${retro.ink}`,
					borderRadius: "2px",
					backgroundColor: retro.surface,
					boxShadow: retro.bevel,
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Box
					sx={{
						width: 10,
						height: 10,
						flexShrink: 0,
						bgcolor: retro.accents[2],
						border: `1px solid ${retro.ink}`,
					}}
				/>
				<Typography variant="caption" sx={{ color: "text.secondary", textAlign: "left" }}>
					{t("currently")}{" "}
					<Box
						component="span"
						sx={{ color: "text.primary", fontWeight: 600 }}
					>
						{siteConfig.currentProject}
					</Box>
				</Typography>
			</Box>

			<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5, mt: 0.5 }}>
				<Button variant="contained" onClick={() => openWindow("projects")}>{t("projects")} ↗</Button>
				<Button
					variant="outlined"
					onClick={() => openWindow("about")}
					sx={{
						borderColor: "primary.main",
						color: "text.primary",
						"&:hover": {
							backgroundColor: "primaryLight",
							borderColor: "primary.main",
						},
					}}
				>
					{t("openAbout")}
				</Button>
				<Button
					variant="contained"
					onClick={() => openWindow("contact")}
					sx={{
						backgroundColor: "primary.main",
						"&:hover": {
							backgroundColor: "primaryDark",
						},
					}}
				>
					{t("contact")}
				</Button>
			</Box>
			<Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.6rem" }}>{t("footer")}</Typography>
		</Box>
	);
}
