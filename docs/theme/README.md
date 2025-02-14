# Theme System Documentation

## Overview

The application uses a custom Material-UI theme system that provides a consistent, modern, and accessible design across all components. The theme system supports both light and dark modes and includes a comprehensive set of design tokens for colors, typography, spacing, and component styles.

## Theme Configuration

### Color Palette

The theme includes two color modes (light and dark) with the following color tokens:

```typescript
colors = {
  primary: {
    main: '#FF6B6B',     // Vibrant coral red
    light: '#FF8E8E',
    dark: '#E54848',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4ECDC4',     // Turquoise
    light: '#7EDCD6',
    dark: '#2EAF9F',
    contrastText: '#000000',
  },
  // ... other color tokens
}
```

### Typography

The theme uses a modern typography system with the following font stack:
- Primary: Quicksand
- Fallback: Inter, system fonts
- Monospace: Fira Code, JetBrains Mono

Typography variants include custom styles for headers, body text, and special text elements.

### Spacing

The theme uses an 8px base unit for spacing with the following scale:
- xs: 2 * 8px (16px)
- sm: 3 * 8px (24px)
- md: 4 * 8px (32px)

## Usage

### Theme Provider

Wrap your application with the ThemeProvider:

```tsx
import { ThemeProvider } from '../contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Using Theme in Components

Access theme values in your components:

```tsx
import { useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

function YourComponent() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useCustomTheme();

  return (
    <Box sx={{ 
      color: theme.palette.text.primary,
      bgcolor: theme.palette.background.paper
    }}>
      {/* Your component content */}
    </Box>
  );
}
```

### Styled Components

Create themed styled components:

```tsx
const StyledComponent = styled(Component)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.2s ease-in-out',
}));
```

## Best Practices

1. **Color Usage**
   - Use theme palette colors instead of hardcoded values
   - Ensure sufficient contrast ratios for accessibility
   - Use semantic color tokens (e.g., `error.main` for error states)

2. **Typography**
   - Use typography variants consistently
   - Maintain proper hierarchy with heading levels
   - Use monospace font for code and technical content

3. **Spacing**
   - Use theme spacing function for consistent layout
   - Follow 8px grid system
   - Use responsive spacing values

4. **Transitions**
   - Apply consistent animation durations
   - Use theme transition easings
   - Consider reduced motion preferences

5. **Accessibility**
   - Maintain WCAG 2.1 contrast ratios
   - Support keyboard navigation
   - Provide proper ARIA attributes

## Component Theming Examples

### Containers

```tsx
const StyledContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));
```

### Buttons

```tsx
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));
```

### Text Elements

```tsx
const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  '&.gradient': {
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));
```

## Theme Customization

To customize the theme, modify the theme configuration in `src/styles/theme.ts`. The theme supports:

- Custom color palettes
- Typography variants
- Spacing scales
- Component style overrides
- Shape configurations
- Transition timings

## Testing

When testing themed components:

1. Wrap test components with ThemeProvider
2. Test both light and dark modes
3. Verify responsive behavior
4. Check accessibility requirements
5. Test theme transitions

```tsx
import { ThemeProvider } from '../contexts/ThemeContext';

describe('ThemedComponent', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>
    );
    // ... test assertions
  });
});
``` 