import aboutImage from "@/public/images/about.png";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export function AboutApp() {
	return (
		<Box sx={{ p: 3 }}>
			<Grid container spacing={4}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Typography
						variant="h5"
						sx={{
							color: "primary.main",
							mb: 2,
							fontWeight: 700,
						}}
					>
						About Me
					</Typography>
					<Typography
						variant="body1"
						sx={{ color: "text.secondary", mb: 2 }}
					>
						Hello, I&apos;m Fadlur Rahman!
					</Typography>
					<Typography
						variant="body1"
						sx={{ color: "text.secondary", mb: 2 }}
					>
						I&apos;m a Dynamic Front End Programmer with over 4
						years of experience crafting innovative web/mobile
						applications that enhance user engagement and
						operational efficiency.
					</Typography>
					<Typography
						variant="body1"
						sx={{ color: "text.secondary" }}
					>
						My expertise lies in leveraging advanced frameworks such
						as React, Next.js, and React Native to develop
						responsive applications and robust front-end
						architectures. I am proficient in collaborating with
						cross-functional teams to deliver scalable and
						high-performance systems.
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, md: 6 }}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							position: "relative",
							width: "100%",
							maxWidth: 280,
							aspectRatio: "3/4",
							bgcolor: "background.paper",
							borderTop: (theme) =>
								`2px solid ${theme.palette.primary.main}`,
							overflow: "hidden",
						}}
					>
						<Image
							src={aboutImage}
							alt="About Image"
							fill
							style={{ objectFit: "cover" }}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
