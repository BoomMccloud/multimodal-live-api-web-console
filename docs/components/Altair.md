# Altair Component

## Overview

The Altair component is a themed visualization component that integrates Vega-Embed with Material-UI styling. It provides a seamless way to display data visualizations while maintaining consistency with the application's theme system.

## Features

- Theme-aware visualization container
- Automatic dark/light mode support
- Smooth transitions and hover effects
- Customizable chart styling
- Integration with Gemini API for dynamic chart generation

## Usage

```tsx
import { Altair } from '../components/altair/Altair';

function YourComponent() {
  return (
    <div>
      <Altair />
    </div>
  );
}
```

## Theming

The component uses a `StyledVisualizationContainer` that adapts to the current theme:

```tsx
const StyledVisualizationContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
  '.vega-embed': {
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '& .vega-actions': {
      display: 'none',
    },
  },
}));
```

### Vega Theme Configuration

The component automatically configures Vega-Embed with theme-aware settings:

```typescript
const vegaConfig = {
  background: 'transparent',
  axis: {
    labelColor: theme.palette.text.primary,
    titleColor: theme.palette.text.primary,
    gridColor: theme.palette.divider,
  },
  legend: {
    labelColor: theme.palette.text.primary,
    titleColor: theme.palette.text.primary,
  },
  title: {
    color: theme.palette.text.primary,
  },
  style: {
    "guide-label": {
      fill: theme.palette.text.primary,
    },
    "guide-title": {
      fill: theme.palette.text.primary,
    },
  },
};
```

## API Integration

The component integrates with the Gemini API for dynamic chart generation:

```typescript
const declaration = {
  name: "render_altair",
  description: "Displays an altair graph in json format.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      json_graph: {
        type: SchemaType.STRING,
        description: "JSON STRING representation of the graph to render",
      },
    },
    required: ["json_graph"],
  },
};
```

## Props

The component is memoized and doesn't accept any props, as it handles its own state internally.

## State Management

- `jsonString`: Manages the current visualization data
- `mode`: Tracks the current theme mode
- `vegaConfig`: Memoized configuration for Vega-Embed

## Theme Integration

The component uses both Material-UI's theme system and a custom theme context:

```typescript
const theme = useTheme();
const { mode } = useCustomTheme();
```

## Accessibility

The component ensures accessibility by:
- Maintaining proper contrast ratios in both theme modes
- Using semantic HTML structure
- Providing proper ARIA attributes through Material-UI components

## Best Practices

1. **Theme Consistency**
   - Always use theme tokens for colors and spacing
   - Maintain consistent border radius and shadow values
   - Use proper transition timings

2. **Performance**
   - Use memoization for expensive computations
   - Implement proper cleanup in useEffect hooks
   - Optimize re-renders with memo

3. **Error Handling**
   - Handle JSON parsing errors gracefully
   - Provide fallback UI for loading states
   - Clean up resources on component unmount

## Testing

Test the component in both theme modes:

```typescript
describe('Altair', () => {
  it('renders with theme-aware styling', () => {
    render(
      <ThemeProvider>
        <Altair />
      </ThemeProvider>
    );
    // ... test assertions
  });

  it('adapts to theme changes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Altair />
      </ThemeProvider>
    );
    // Test theme switching
  });
});
``` 