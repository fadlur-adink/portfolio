"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const pages = [
	{ name: "home", href: "/#home" },
	{ name: "works", href: "/#works" },
	{ name: "about-me", href: "/#about-me" },
	{ name: "contacts", href: "/#contacts" },
];

function Navbar() {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(
		null,
	);
	const [language, setLanguage] = React.useState("EN");
	const theme = useTheme();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
		setLangAnchorEl(event.currentTarget);
	};

	const handleLangClose = (lang?: string) => {
		if (lang) setLanguage(lang);
		setLangAnchorEl(null);
	};

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{
				textAlign: "center",
				bgcolor: "background.default",
				height: "100%",
			}}
		>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Fadlur Rahman
      </Typography>
			<List>
				{pages.map((page) => (
					<ListItem key={page.name} disablePadding>
						<ListItemButton
							component={Link}
							href={page.href}
							sx={{ textAlign: "center" }}
						>
							<ListItemText
								primary={
									<span
										style={{
											color: theme.palette.primary.main,
										}}
									>
										#
									</span>
								}
								secondary={page.name}
								secondaryTypographyProps={{
									color: "text.primary",
								}}
							/>
						</ListItemButton>
					</ListItem>
				))}
				<ListItem disablePadding>
					<ListItemButton
						onClick={(e) => handleLangClick(e)}
						sx={{ textAlign: "center", justifyContent: "center" }}
					>
						<ListItemText primary={language} secondary="Language" />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<AppBar
			position="fixed"
			color="transparent"
			elevation={0}
			sx={{
				pt: 2,
				backdropFilter: "blur(10px)",
				backgroundColor: "rgba(30, 31, 36, 0.7)",
				borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            Fadlur Rahman
          </Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "flex-end",
							gap: 4,
						}}
					>
						{pages.map((page) => (
							<Button
								key={page.name}
								component={Link}
								href={page.href}
								sx={{
									my: 2,
									color: "text.secondary",
									display: "block",
									position: "relative",
									"&:hover": {
										color: "text.primary",
										"&::after": {
											width: "100%",
										},
									},
									"&::after": {
										content: '""',
										position: "absolute",
										width: "0",
										height: "2px",
										bottom: "0",
										left: "0",
										backgroundColor: "#a855f7",
										transition: "width 0.3s ease-in-out",
									},
								}}
							>
								<span style={{ color: "#a855f7" }}>#</span>
								{page.name}
							</Button>
						))}

						<Button
							onClick={handleLangClick}
							endIcon={<KeyboardArrowDownIcon />}
							sx={{
								my: 2,
								color: "text.secondary",
								display: "flex",
								"&:hover": { color: "text.primary" },
								fontWeight: "bold",
							}}
						>
							{language}
						</Button>
						<Menu
							anchorEl={langAnchorEl}
							open={Boolean(langAnchorEl)}
							onClose={() => handleLangClose()}
							sx={{ mt: 1 }}
						>
							<MenuItem onClick={() => handleLangClose("EN")}>
								EN
							</MenuItem>
							<MenuItem onClick={() => handleLangClose("ID")}>
								ID
							</MenuItem>
						</Menu>
					</Box>

					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</Container>

			<nav>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: 240,
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</AppBar>
	);
}
export default Navbar;
