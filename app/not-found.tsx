"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";

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
        <MuiLink
          href="/"
          underline="none"
          sx={{
            display: "inline-block",
            px: 3,
            py: 1.5,
            border: "1px solid",
            borderColor: "primary.main",
            color: "primary.main",
            borderRadius: 1,
            "&:hover": {
              bgcolor: "primary.main",
              color: "background.paper",
            },
          }}
        >
          Go back home
        </MuiLink>
      </Container>
    </Box>
  );
}
