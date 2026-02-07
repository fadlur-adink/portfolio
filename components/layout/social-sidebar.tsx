import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import BrushIcon from "@mui/icons-material/Brush";
import { siteConfig } from "@/config/site";

export default function SocialSidebar() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "1rem",
        top: 0,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          width: "1px",
          height: "200px",
          bgcolor: "text.secondary",
          mb: 1,
        }}
      />
      <IconButton
        aria-label="github"
        href={siteConfig.links.github}
        target="_blank"
        sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        aria-label="linkedin"
        href={siteConfig.links.linkedin}
        target="_blank"
        sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
      >
        <LinkedInIcon />
      </IconButton>
      <IconButton
        aria-label="figma"
        href={siteConfig.links.figma}
        target="_blank"
        sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
      >
        <BrushIcon />
      </IconButton>
    </Box>
  );
}
