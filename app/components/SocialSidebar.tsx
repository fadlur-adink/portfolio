'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import BrushIcon from '@mui/icons-material/Brush';

const SocialSidebar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: '1rem',
        top: 0,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        zIndex: 100
      }}
    >
      <Box 
        sx={{ 
            width: '1px', 
            height: '200px', 
            bgcolor: 'text.secondary',
            mb: 1
        }} 
      />
      <IconButton aria-label="github" href="https://github.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
        <GitHubIcon />
      </IconButton>
      <IconButton aria-label="dribbble" href="https://dribbble.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
        <LanguageIcon />
      </IconButton>
      <IconButton aria-label="figma" href="https://figma.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
         <BrushIcon />
      </IconButton>
    </Box>
  );
};

export default SocialSidebar;
