# ControlTray Component

## Overview

The ControlTray component provides a themed control interface for managing media streams and application settings. It features a modern, accessible design with smooth animations and theme-aware styling.

## Features

- Theme-aware control buttons
- Media stream controls (webcam, screen capture)
- Audio controls with visual feedback
- Theme toggle functionality
- Connection status indicator
- Smooth animations and hover effects

## Usage

```tsx
import ControlTray from '../components/control-tray/ControlTray';

function YourComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <ControlTray
      videoRef={videoRef}
      supportsVideo={true}
      onVideoStreamChange={setVideoStream}
    >
      {/* Optional additional controls */}
    </ControlTray>
  );
}
```

## Props

```typescript
export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};
```

## Styled Components

### Control Tray Container

```tsx
const StyledControlTray = styled('section')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 0)',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));
```

### Action Navigation

```tsx
const StyledActionNav = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 27,
  border: `1px solid ${theme.palette.divider}`,
  display: 'inline-flex',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  padding: theme.spacing(1.25),
  transition: 'all 0.6s ease-in',
  '&.disabled': {
    opacity: 0.7,
    pointerEvents: 'none',
  }
}));
```

### Control Buttons

```tsx
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 18,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}));
```

## Theme Integration

The component uses both Material-UI's theme system and a custom theme context:

```typescript
const theme = useTheme();
const { mode, toggleColorMode } = useCustomTheme();
```

## Features

### Media Controls

1. **Microphone Toggle**
   - Themed mic button with active state
   - Visual feedback for audio input
   - Smooth transitions

2. **Video Controls**
   - Webcam toggle with theme-aware icons
   - Screen capture with status indication
   - Automatic stream management

3. **Theme Toggle**
   - Light/dark mode switch
   - Tooltip with current mode
   - Smooth transition effects

4. **Connection Status**
   - Visual connection indicator
   - Status text with theme colors
   - Animated transitions

## State Management

The component manages several pieces of state:
- Active video stream
- Audio mute status
- Connection status
- Theme mode

## Accessibility

The component ensures accessibility through:
- Proper ARIA labels
- Keyboard navigation support
- High contrast ratios
- Clear visual feedback
- Tooltips for button actions

## Best Practices

1. **Theme Consistency**
   - Use theme tokens for colors
   - Maintain consistent spacing
   - Follow button styling patterns

2. **Performance**
   - Memoize callback functions
   - Clean up media streams
   - Optimize re-renders

3. **Error Handling**
   - Handle media stream errors
   - Provide fallback states
   - Clear error messages

## Testing

Test the component's functionality and styling:

```typescript
describe('ControlTray', () => {
  it('renders with theme-aware styling', () => {
    const videoRef = createRef<HTMLVideoElement>();
    render(
      <ThemeProvider>
        <ControlTray
          videoRef={videoRef}
          supportsVideo={true}
          onVideoStreamChange={() => {}}
        />
      </ThemeProvider>
    );
    // ... test assertions
  });

  it('handles media controls correctly', () => {
    // Test media control functionality
  });

  it('manages theme switching', () => {
    // Test theme toggle functionality
  });
});
```

## Examples

### Basic Usage

```tsx
<ControlTray
  videoRef={videoRef}
  supportsVideo={true}
  onVideoStreamChange={handleStreamChange}
/>
```

### With Custom Controls

```tsx
<ControlTray
  videoRef={videoRef}
  supportsVideo={true}
  onVideoStreamChange={handleStreamChange}
>
  <StyledIconButton onClick={handleCustomAction}>
    <CustomIcon />
  </StyledIconButton>
</ControlTray>
```

### Disabled Video Support

```tsx
<ControlTray
  videoRef={videoRef}
  supportsVideo={false}
  onVideoStreamChange={handleStreamChange}
/>
``` 