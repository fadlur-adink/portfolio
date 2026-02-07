'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SkillsSection from '../components/SkillsSection';

export default function AboutMePage() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
            <Typography variant="h4">
                <span style={{ color: '#a855f7' }}>/</span>about-me
            </Typography>
            <Box sx={{ height: '1px', bgcolor: '#a855f7', width: '200px', ml: 2, display: { xs: 'none', md: 'block' } }} />
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 8 }}>
            Who am I?
        </Typography>

        <Grid container spacing={8}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Hello, I&apos;m Fadlur Rahman!
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    I&apos;m a Dynamic Front End Programmer with over 4 years of experience crafting innovative web and mobile applications that enhance user engagement and operational efficiency. Based in Jakarta, Indonesia.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    My expertise lies in leveraging advanced frameworks such as React, Next.js, and React Native to develop responsive applications and robust front-end architectures. I am proficient in collaborating with cross-functional teams to deliver scalable and high-performance systems tailored to client needs. I am committed to continuous improvement through code optimization and the creation of user-friendly interfaces.
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Box sx={{
                     position: 'relative',
                     width: '100%',
                     maxWidth: 350,
                     aspectRatio: '3/4',
                     bgcolor: 'background.paper',
                     borderTop: '1px solid',
                     borderColor: 'primary.main',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                 }}>
                      <Typography color="text.secondary">[About Image]</Typography>
                      <Box component="img" src="/assets_ref/About.png" sx={{ display: 'none' }} />
                      
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 50, 
                        left: -10, 
                        width: 50, 
                        height: 50, 
                        backgroundImage: 'radial-gradient(#a855f7 2px, transparent 2px)',
                        backgroundSize: '10px 10px',
                        opacity: 0.5,
                        zIndex: 0
                    }} />
                 </Box>
            </Grid>
        </Grid>

        <SkillsSection />
      </Container>
    </Box>
  );
}
