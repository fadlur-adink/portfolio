'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';

const ContactsSection = () => {
  return (
    <Box id="contacts" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
            <Typography variant="h4">
                <span style={{ color: '#a855f7' }}>#</span>contacts
            </Typography>
            <Box sx={{ height: '1px', bgcolor: '#a855f7', width: '200px', ml: 2, display: { xs: 'none', md: 'block' } }} />
        </Box>

        <Grid container spacing={8}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                    I&apos;m interested in freelance opportunities. However, if you have other request or question, don&apos;t hesitate to contact me
                </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                        Message me here
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                        <ChatIcon fontSize="small" color="secondary" />
                        <Typography variant="body2" color="text.secondary">Fadlur#1234</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon fontSize="small" color="secondary" />
                        <Typography variant="body2" color="text.secondary">contact@fadlur.dev</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactsSection;
