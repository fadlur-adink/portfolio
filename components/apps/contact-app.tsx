import { siteConfig } from "@/config/site";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Grid, Link, Typography } from "@mui/material";

export function ContactApp() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant="h5"
				sx={{ color: "primary.main", mb: 3, fontWeight: 700 }}
			>
				Contact
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
							p: 3,
							border: (theme) =>
								`1px solid ${theme.palette.divider}`,
							borderRadius: "8px",
							backgroundColor: "background.paper",
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
