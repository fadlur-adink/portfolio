import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { colors } from "@/config/colors";

export default function NotFound() {
  return (
    <Box sx={{ py: 16, textAlign: "center" }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          <Box component="span" sx={{ color: "primary.main" }}>
            404
          </Box>
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            border: `1px solid ${colors.primary.main}`,
            color: colors.primary.main,
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Go back home
        </Link>
      </Container>
    </Box>
  );
}
