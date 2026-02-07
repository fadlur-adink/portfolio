'use client';

import { createTheme } from '@mui/material/styles';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1f24',
      paper: '#24262d',
    },
    primary: {
      main: '#a855f7',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: jetbrainsMono.style.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: jetbrainsMono.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: jetbrainsMono.style.fontFamily,
      fontWeight: 700,
    },
    h4: {
      fontFamily: jetbrainsMono.style.fontFamily,
      fontWeight: 700,
    },
    h5: {
      fontFamily: jetbrainsMono.style.fontFamily,
      fontWeight: 700,
    },
    h6: {
      fontFamily: jetbrainsMono.style.fontFamily,
      fontWeight: 700,
    },
    button: {
      fontFamily: jetbrainsMono.style.fontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#a855f7 #1e1f24',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#1e1f24',
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#a855f7',
            minHeight: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontSize: '1rem',
        },
        outlined: {
          borderColor: '#a855f7',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#a855f7',
            backgroundColor: 'rgba(168, 85, 247, 0.08)',
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.4)',
          },
        },
        contained: {
          borderRadius: '4px',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#24262d',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 0,
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
            textDecoration: 'none',
            '&:hover': {
                color: '#a855f7',
            }
        }
      }
    }
  },
});

export default theme;
