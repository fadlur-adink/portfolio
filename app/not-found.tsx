'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box sx={{ py: 16, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 'bold', mb: 2 }}>
          <span style={{ color: '#a855f7' }}>404</span>
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="outlined"
          sx={{
            borderColor: '#a855f7',
            color: '#a855f7',
            '&:hover': {
              borderColor: '#a855f7',
              bgcolor: 'rgba(168, 85, 247, 0.1)',
            },
          }}
        >
          Go back home
        </Button>
      </Container>
    </Box>
  );
}
