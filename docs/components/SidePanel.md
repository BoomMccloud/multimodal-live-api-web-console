# SidePanel Component

## Overview

The SidePanel component provides a collapsible, themed sidebar interface for displaying logs and managing console interactions. It features smooth animations, theme integration, and responsive design.

## Features

- Collapsible sidebar with smooth animations
- Theme-aware styling
- Log filtering capabilities
- Connection status indicator
- Interactive message input
- Custom styled select dropdown

## Usage

```tsx
import SidePanel from '../components/side-panel/SidePanel';

function YourComponent() {
  return (
    <div className="streaming-console">
      <SidePanel />
      {/* Your main content */}
    </div>
  );
}
```

## Styled Components

### Main Container

```tsx
const StyledSidePanel = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  width: '40px',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  transition: 'all 0.2s ease-in',
  borderRight: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  fontSize: '13px',
  '&.open': {
    width: '400px',
  },
}));
```

### Select Dropdown

```tsx
const StyledSelect = styled(ReactSelect)(({ theme }) => ({
  '& .react-select__control': {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: '33px',
    maxHeight: '33px',
    border: `1px solid ${theme.palette.divider}`,
  },
  '& .react-select__single-value': {
    color: theme.palette.text.primary,
  },
  '& .react-select__menu': {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  '& .react-select__option': {
    '&:hover, &:focus': {
      background: theme.palette.action.hover,
    },
  },
}));
```

## State Management

The component manages several pieces of state:
- Panel open/closed state
- Selected filter option
- Text input value
- Logger scroll position

## Theme Integration

The component uses Material-UI's theme system for consistent styling:

```typescript
const theme = useTheme();
```

## Features

### Header Section

1. **Title**
   - Gradient text effect
   - Proper typography variant
   - Visibility based on panel state

2. **Toggle Button**
   - Theme-aware icon color
   - Smooth transition
   - Proper hover effects

### Filter Section

1. **Filter Dropdown**
   - Custom styled select component
   - Theme-aware colors
   - Proper hover and focus states

2. **Connection Status**
   - Visual indicator
   - Theme-aware colors
   - Status text

### Logger Section

1. **Log Display**
   - Auto-scrolling behavior
   - Filtered view options
   - Theme-aware styling

### Input Section

1. **Message Input**
   - Theme-aware text field
   - Send button with icon
   - Disabled state handling

## Accessibility

The component implements accessibility features:
- Keyboard navigation support
- Proper ARIA labels
- Focus management
- Color contrast compliance
- Screen reader support

## Best Practices

1. **Theme Consistency**
   - Use theme tokens for colors
   - Maintain consistent spacing
   - Follow typography hierarchy

2. **Performance**
   - Optimize scroll handling
   - Manage state updates efficiently
   - Clean up event listeners

3. **User Experience**
   - Smooth animations
   - Clear visual feedback
   - Intuitive interactions

## Testing

Test the component's functionality:

```typescript
describe('SidePanel', () => {
  it('renders in collapsed state', () => {
    render(
      <ThemeProvider>
        <SidePanel />
      </ThemeProvider>
    );
    // ... test assertions
  });

  it('toggles panel state', () => {
    // Test panel open/close functionality
  });

  it('handles filter changes', () => {
    // Test filter dropdown functionality
  });

  it('manages message input', () => {
    // Test input and send functionality
  });
});
```

## Examples

### Basic Usage

```tsx
<SidePanel />
```

### With Custom Styling

```tsx
const CustomStyledSidePanel = styled(SidePanel)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.default,
  },
}));

<CustomStyledSidePanel />
```

## Filter Options

```typescript
const filterOptions = [
  { value: "conversations", label: "Conversations" },
  { value: "tools", label: "Tool Use" },
  { value: "none", label: "All" },
];
```

## Component Structure

```
SidePanel
├── Header
│   ├── Title
│   └── Toggle Button
├── Filter Section
│   ├── Filter Dropdown
│   └── Connection Status
├── Logger Section
│   └── Filtered Logs
└── Input Section
    ├── Text Input
    └── Send Button
```

## Theme Customization

The component can be customized through the theme:

```typescript
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // Custom paper styles
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Custom input styles
        },
      },
    },
  },
});
``` 