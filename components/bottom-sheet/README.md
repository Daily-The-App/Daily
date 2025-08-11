# AuthBottomSheet Component

A fully-featured bottom sheet component built with React Native Reanimated and Gesture Handler, designed specifically for authentication flows and general-purpose use.

## Features

- ✅ **Full-screen overlay** with dim color overlay token; taps outside close the sheet
- ✅ **Sheet styling** with rounded top corners, shadow/elevation per platform standards
- ✅ **Handle bar** at top center using theme-aware colors
- ✅ **Pan Gesture** to drag down and dismiss with spring-back behavior
- ✅ **Threshold-based dismissal** with velocity support
- ✅ **Dual API support**: Imperative (forwardRef) and controlled props
- ✅ **Router integration** with `router.back()` as default dismiss behavior
- ✅ **Spring animations** with translateY from bottom and fade/dim overlay
- ✅ **Snap points**: 0 (hidden) and contentHeight
- ✅ **Accessibility**: focus trap when open, `accessibilityViewIsModal` support
- ✅ **Theme support** using existing design tokens

## Installation

The component uses the following dependencies that are already installed in this project:
- `react-native-reanimated`
- `react-native-gesture-handler`
- `expo-router`

## Usage

### Import

```tsx
import { AuthBottomSheet, AuthBottomSheetRef } from '@/components/bottom-sheet';
// or
import { AuthBottomSheet, AuthBottomSheetRef } from '@/components/bottom-sheet/AuthBottomSheet';
```

### 1. Imperative API (with forwardRef)

```tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthBottomSheet, AuthBottomSheetRef } from '@/components/bottom-sheet';

export function MyComponent() {
  const bottomSheetRef = useRef<AuthBottomSheetRef>(null);

  const openSheet = () => {
    bottomSheetRef.current?.open();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View>
      <TouchableOpacity onPress={openSheet}>
        <Text>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <AuthBottomSheet 
        ref={bottomSheetRef}
        onDismiss={() => console.log('Sheet dismissed')}
        contentHeight={300}
      >
        <View style={{ padding: 20 }}>
          <Text>Sheet Content</Text>
          <TouchableOpacity onPress={closeSheet}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </AuthBottomSheet>
    </View>
  );
}
```

### 2. Controlled Props API

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthBottomSheet } from '@/components/bottom-sheet';

export function MyComponent() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsSheetOpen(true)}>
        <Text>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <AuthBottomSheet 
        isOpen={isSheetOpen}
        onDismiss={() => setIsSheetOpen(false)}
        contentHeight={400}
      >
        <View style={{ padding: 20 }}>
          <Text>Sheet Content</Text>
          <TouchableOpacity onPress={() => setIsSheetOpen(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </AuthBottomSheet>
    </View>
  );
}
```

### 3. Router Back Integration (Default Behavior)

```tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthBottomSheet, AuthBottomSheetRef } from '@/components/bottom-sheet';

export function MyComponent() {
  const bottomSheetRef = useRef<AuthBottomSheetRef>(null);

  return (
    <View>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.open()}>
        <Text>Open Bottom Sheet</Text>
      </TouchableOpacity>

      {/* This will call router.back() when dismissed */}
      <AuthBottomSheet ref={bottomSheetRef}>
        <View style={{ padding: 20 }}>
          <Text>Sheet Content</Text>
          <Text>Tap outside, drag handle, or navigate back to dismiss</Text>
        </View>
      </AuthBottomSheet>
    </View>
  );
}
```

## Props

### `AuthBottomSheetProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The content to render inside the bottom sheet |
| `isOpen` | `boolean` | `false` | Controls the sheet's open/closed state (controlled mode) |
| `onDismiss` | `() => void` | `router.back()` | Callback when sheet is dismissed |
| `contentHeight` | `number` | `SCREEN_HEIGHT * 0.5` | Fixed height for the sheet content |

### `AuthBottomSheetRef`

| Method | Type | Description |
|--------|------|-------------|
| `open` | `() => void` | Imperatively open the bottom sheet |
| `close` | `() => void` | Imperatively close the bottom sheet |

## Behavior

### Dismissal Methods
1. **Tap outside**: Tapping the overlay dismisses the sheet
2. **Drag down**: Pan gesture with threshold-based dismissal
3. **Velocity**: Fast downward swipe dismisses regardless of distance
4. **Programmatic**: Call `close()` method or set `isOpen={false}`
5. **Navigation**: Default `router.back()` behavior

### Animation Details
- **Opening**: `translateY` spring animation from bottom + overlay fade-in
- **Closing**: `translateY` spring animation to bottom + overlay fade-out
- **Dragging**: Real-time `translateY` tracking with opacity changes
- **Spring Config**: Optimized for smooth, natural feel

### Accessibility
- `accessibilityViewIsModal={true}` for focus trapping
- `accessibilityRole="dialog"` for screen reader context
- Handle bar is hidden from accessibility tree
- Overlay has proper accessibility labels

### Theme Integration
- Uses `Colors[theme].background` for sheet background
- Uses `Colors[theme].icon` for handle bar color
- Automatically adapts to light/dark theme changes

## Technical Implementation

### Key Technologies
- **React Native Reanimated 3**: For smooth 60fps animations
- **Gesture Handler**: For pan gesture recognition
- **Expo Router**: For navigation integration
- **TypeScript**: Full type safety

### Performance Optimizations
- Conditional rendering based on visibility state
- `useDerivedValue` for computed visibility
- Minimal re-renders with `useCallback` and `useMemo`
- Gesture handler runs on UI thread

### Platform Differences
- iOS: Uses shadow properties for elevation effect
- Android: Uses elevation property
- iOS: Accounts for home indicator spacing
- Android: Accounts for status bar height

## Examples

Check out the complete examples in `AuthBottomSheetExample.tsx` for detailed implementation patterns and use cases.

## Troubleshooting

### Common Issues

1. **Sheet not showing**: Make sure to call `open()` or set `isOpen={true}`
2. **Gesture not working**: Ensure parent doesn't have conflicting gesture handlers
3. **Animation jerky**: Check if running in development mode (animations are smoother in production)
4. **Router back not working**: Verify you're using expo-router and the route has a back action

### Performance Tips

1. Keep content simple to avoid layout calculations during animation
2. Use `contentHeight` prop for consistent sizing
3. Avoid heavy computations in gesture handlers
4. Test on physical devices for accurate gesture performance

## Design Tokens

The component uses existing design tokens from `@/constants/Colors`:
- Background colors: `Colors[theme].background`
- Handle color: `Colors[theme].icon`
- Overlay: Fixed `rgba(0, 0, 0, 0.4)` dim effect

For custom theming, extend the Colors object or pass custom styles through children.
