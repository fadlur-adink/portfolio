'use client';

import { createTheme } from '@mui/material/styles';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { colors } from './colors';

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
      default: colors.background.default,
      paper: colors.background.paper,
    },
    primary: {
      main: colors.primary.main,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    divider: colors.divider,
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
          scrollbarColor: `${colors.primary.main} ${colors.background.default}`,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: colors.background.default,
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: colors.primary.main,
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
          borderColor: colors.primary.main,
          color: colors.text.primary,
          '&:hover': {
            borderColor: colors.primary.main,
            backgroundColor: colors.primary.light,
            boxShadow: `0 0 8px ${colors.primary.light}`,
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
          backgroundColor: colors.background.paper,
          border: `1px solid ${colors.divider}`,
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
                color: colors.primary.main,
            }
        }
      }
    }
  },
});

export default theme;
