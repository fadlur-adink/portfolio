import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SectionHeaderProps {
  title: string;
  showLine?: boolean;
  lineWidth?: string;
}

export default function SectionHeader({
  title,
  showLine = true,
  lineWidth = "200px",
}: SectionHeaderProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h4">
        <Box component="span" sx={{ color: "primary.main" }}>
          #
        </Box>
        {title}
      </Typography>
      {showLine && (
        <Box
          sx={{
            height: "1px",
            bgcolor: "primary.main",
            width: lineWidth,
            ml: 2,
            display: { xs: "none", md: "block" },
          }}
        />
      )}
    </Box>
  );
}
