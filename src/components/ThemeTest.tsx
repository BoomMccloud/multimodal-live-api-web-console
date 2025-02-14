import React from 'react';
import { Box, Button, Typography, Paper, useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

export const ThemeTest = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useCustomTheme();

  return (
    <Paper 
      sx={{ 
        p: 3, 
        m: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        background: theme.palette.background.paper
      }}
    >
      <Typography variant="h1">Rainbow Theme Test</Typography>
      <Typography variant="h2">Secondary Header</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
        <Button variant="contained" color="error">
          Error Button
        </Button>
        <Button variant="contained" color="warning">
          Warning Button
        </Button>
        <Button variant="contained" color="success">
          Success Button
        </Button>
      </Box>
      <Button onClick={toggleColorMode}>
        Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </Paper>
  );
}; 