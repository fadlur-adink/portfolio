"use client";

import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Grid, Link, Typography, useTheme } from "@mui/material";

export function ContactApp() {
	const theme = useTheme();
	const t = useTranslations("Contact");
	return (
		<Box sx={{ p: 3, overflowWrap: "anywhere", "& .MuiGrid-root": { minWidth: 0 }, "& .MuiSvgIcon-root": { flexShrink: 0 } }}>
			<Typography
				variant="h5"
				sx={{ color: "primary.main", mb: 3, fontWeight: 700 }}
			>
				{t("title")}
			</Typography>

			<Grid container spacing={4}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Typography
						variant="body1"
						sx={{ color: "text.secondary", mb: 2 }}
					>
						I&apos;m interested in freelance opportunities. However,
						if you have other request or question, don&apos;t
						hesitate to contact me.
					</Typography>
					<Typography
						variant="body1"
						sx={{ color: "text.secondary" }}
					>
						I&apos;m always open to discussing new projects,
						creative ideas, or opportunities to be part of your
						vision.
					</Typography>
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					<Box
						sx={{
							p: 2,
							border: `2px solid ${theme.palette.retro.ink}`,
							borderRadius: "2px",
							boxShadow: theme.palette.retro.shadow,
							backgroundColor: theme.palette.retro.surface,
						}}
					>
						<Typography
							variant="h6"
							sx={{
								mb: 3,
								fontWeight: 700,
								color: "text.primary",
							}}
						>
							Get in Touch
						</Typography>

						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							{/* <Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2,
								}}
							>
								<ChatIcon sx={{ color: "primary.main" }} />
								<Box>
									<Typography
										variant="caption"
										sx={{
											color: "text.secondary",
										}}
									>
										Discord
									</Typography>
									<Typography
										variant="body2"
										sx={{
											color: "text.primary",
										}}
									>
										{siteConfig.discord}
									</Typography>
								</Box>
							</Box> */}

							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2,
								}}
							>
								<EmailIcon sx={{ color: "primary.main" }} />
								<Box>
									<Typography
										variant="caption"
										sx={{
											color: "text.secondary",
										}}
									>
										Email
									</Typography>
									<Typography
										variant="body2"
										sx={{
											color: "text.primary",
										}}
									>
										{siteConfig.email}
									</Typography>
								</Box>
							</Box>

							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2,
								}}
							>
								<GitHubIcon sx={{ color: "primary.main" }} />
								<Box>
									<Typography
										variant="caption"
										sx={{
											color: "text.secondary",
										}}
									>
										GitHub
									</Typography>
									<Typography
										variant="body2"
										sx={{
											color: "text.primary",
										}}
									>
										<Link
											href={siteConfig.links.github}
											target="_blank"
										>
											{siteConfig.links.github}
										</Link>
									</Typography>
								</Box>
							</Box>

							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2,
								}}
							>
								<LinkedInIcon sx={{ color: "primary.main" }} />
								<Box>
									<Typography
										variant="caption"
										sx={{
											color: "text.secondary",
										}}
									>
										LinkedIn
									</Typography>
									<Typography
										variant="body2"
										sx={{
											color: "text.primary",
										}}
									>
										<Link
											href={siteConfig.links.linkedin}
											target="_blank"
										>
											{siteConfig.name}
										</Link>
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
