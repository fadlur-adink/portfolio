'use client';

import * as React from 'react';
import Navbar from './Navbar';
import SocialSidebar from './SocialSidebar';
import Footer from './Footer';
import Box from '@mui/material/Box';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <SocialSidebar />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, md: 10 } }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
