import { createTheme } from '@mui/material/styles';

// Color palette definition
const colors = {
  light: {
    primary: {
      main: '#4CAF50', // Primary (P-40) Medium green
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#6B57D2', // On Primary (P-100) Purple
    },
    secondary: {
      main: '#E8F5E9', // Primary Container (P-90) Light mint green
      light: '#F1F8F2',
      dark: '#C8E6C9',
      contrastText: '#1B5E20', // On Primary Container (P-10) Dark green
    },
    background: {
      default: '#FFFFFF',
      paper: '#E8F5E9', // Using Primary Container color for paper backgrounds
      elevated: '#F1F8F2',
    },
    text: {
      primary: '#1B5E20', // Dark green for main text
      secondary: '#6B57D2', // Purple for secondary text
      disabled: '#9CA0A3',
    },
    error: {
      main: '#E74C3C', // Bright red
      light: '#FF6B6B',
      dark: '#C0392B',
    },
    success: {
      main: '#2ECC71', // Emerald green
      light: '#55D98D',
      dark: '#27AE60',
    },
    warning: {
      main: '#F1C40F', // Sunflower yellow
      light: '#F4D03F',
      dark: '#F39C12',
    },
    rainbow: {
      red: '#FF6B6B',
      orange: '#FF9F43',
      yellow: '#F1C40F',
      green: '#2ECC71',
      blue: '#3498DB',
      indigo: '#4834D4',
      violet: '#9B59B6',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  dark: {
    primary: {
      main: '#86CC8F', // Darker version of primary
      light: '#A8FFB3',
      dark: '#6B9F72',
      contrastText: '#1E2021',
    },
    secondary: {
      main: '#2A3B9E', // Lighter version of secondary
      light: '#3C4FC2',
      dark: '#1B2875',
      contrastText: '#E6E0FF',
    },
    background: {
      default: '#1E2021', // On Primary color as background
      paper: '#2A2D2E',
      elevated: '#363A3B',
    },
    text: {
      primary: '#E6E0FF', // On Primary Container color
      secondary: '#B4B7C5',
      disabled: '#6E7175',
    },
    error: {
      main: '#FF6B6B', // Bright red
      light: '#FF8E8E',
      dark: '#E74C3C',
    },
    success: {
      main: '#55D98D', // Lighter emerald
      light: '#7BE495',
      dark: '#2ECC71',
    },
    warning: {
      main: '#F4D03F', // Lighter yellow
      light: '#F7DC6F',
      dark: '#F1C40F',
    },
    rainbow: {
      red: '#FF8E8E',
      orange: '#FFC09F',
      yellow: '#F4D03F',
      green: '#55D98D',
      blue: '#5DADE2',
      indigo: '#5B4EE5',
      violet: '#AF7AC5',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
};

// Typography configuration with more playful fonts
const typography = {
  fontFamily: [
    'Quicksand',
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'none' as const,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  monospace: {
    fontFamily: '"Fira Code", "JetBrains Mono", monospace',
  },
};

// Spacing and layout configuration
const spacing = {
  unit: 8,
  container: {
    padding: {
      xs: 2,
      sm: 3,
      md: 4,
    },
    maxWidth: {
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

// Component-specific overrides with more playful styles
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: '10px 20px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      },
      contained: {
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
        color: '#FFFFFF',
        '&:hover': {
          background: 'linear-gradient(45deg, #FF8E8E, #7EDCD6)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: 16,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      },
    },
  },
};

// Create theme factory function
export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      ...colors[mode],
    },
    typography,
    spacing: spacing.unit,
    components,
    shape: {
      borderRadius: 12,
    },
  });
};

// Export theme-related types
export type AppTheme = ReturnType<typeof createAppTheme>;
export type ColorMode = 'light' | 'dark';

// Export spacing configuration
export { spacing }; 