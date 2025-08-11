import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  ReactNode,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;
const DISMISS_THRESHOLD = 50; // Minimum distance to dismiss
const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

// Sheet handle design token (since no specific tokens mentioned, using reasonable defaults)
const SHEET_HANDLE = {
  width: 40,
  height: 4,
  borderRadius: 2,
  marginTop: 8,
  marginBottom: 16,
};

export interface AuthBottomSheetRef {
  open: () => void;
  close: () => void;
}

export interface AuthBottomSheetProps {
  children: ReactNode;
  isOpen?: boolean;
  onDismiss?: () => void;
  contentHeight?: number;
  forceDarkMode?: boolean;
}

export const AuthBottomSheet = forwardRef<AuthBottomSheetRef, AuthBottomSheetProps>(
  ({ children, isOpen = false, onDismiss, contentHeight, forceDarkMode = false }, ref) => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = forceDarkMode ? 'dark' : (colorScheme ?? 'light');

    // React state for component visibility (for proper re-rendering)
    const [shouldRender, setShouldRender] = useState(false);
    
    // Animation values
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const overlayOpacity = useSharedValue(0);
    const isVisible = useSharedValue(false);

    // Calculate content height if not provided
    const calculatedHeight = contentHeight || SCREEN_HEIGHT * 0.5;
    const snapPoint = SCREEN_HEIGHT - calculatedHeight - (Platform.OS === 'ios' ? 50 : STATUS_BAR_HEIGHT);

    const handleDismiss = useCallback(() => {
      setShouldRender(false);
      if (onDismiss) {
        onDismiss();
      } else {
        // Default behavior: navigate back
        router.back();
      }
    }, [onDismiss, router]);

    const openBottomSheet = useCallback(() => {
      setShouldRender(true);
      isVisible.value = true;
      translateY.value = withSpring(snapPoint, SPRING_CONFIG);
      overlayOpacity.value = withSpring(1, SPRING_CONFIG);
    }, [snapPoint, translateY, overlayOpacity, isVisible]);

    const closeBottomSheet = useCallback(() => {
      translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG, (finished) => {
        if (finished) {
          runOnJS(handleDismiss)();
          isVisible.value = false;
        }
      });
      overlayOpacity.value = withSpring(0, SPRING_CONFIG);
    }, [translateY, overlayOpacity, handleDismiss, isVisible]);

    // Imperative API
    useImperativeHandle(ref, () => ({
      open: openBottomSheet,
      close: closeBottomSheet,
    }), [openBottomSheet, closeBottomSheet]);

    // Handle controlled prop changes
    useEffect(() => {
      if (isOpen) {
        openBottomSheet();
      } else {
        closeBottomSheet();
      }
    }, [isOpen, openBottomSheet, closeBottomSheet]);

    // Pan gesture handler
    const panGesture = Gesture.Pan()
      .onStart(() => {
        // Store initial position for relative calculations
      })
      .onUpdate((event) => {
        // Only allow downward dragging (positive translationY)
        const newTranslateY = Math.max(snapPoint + event.translationY, snapPoint);
        translateY.value = newTranslateY;
        
        // Update overlay opacity based on drag progress
        const dragProgress = Math.min((newTranslateY - snapPoint) / (SCREEN_HEIGHT - snapPoint), 1);
        overlayOpacity.value = 1 - dragProgress * 0.5;
      })
      .onEnd((event) => {
        const shouldDismiss = 
          event.translationY > DISMISS_THRESHOLD || 
          event.velocityY > 500;

        if (shouldDismiss) {
          closeBottomSheet();
        } else {
          // Spring back to open position
          translateY.value = withSpring(snapPoint, SPRING_CONFIG);
          overlayOpacity.value = withSpring(1, SPRING_CONFIG);
        }
      });

    // Animated styles
    const overlayStyle = useAnimatedStyle(() => ({
      opacity: overlayOpacity.value,
    }));

    const sheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    // Don't render if not visible (performance optimization)
    if (!shouldRender) {
      return null;
    }

    return (
      <GestureHandlerRootView style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* Full-screen overlay */}
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <Pressable 
            style={styles.overlayPressable} 
            onPress={closeBottomSheet}
            accessibilityRole="button"
            accessibilityLabel="Close bottom sheet"
            accessibilityHint="Tap to dismiss the bottom sheet"
          />
        </Animated.View>

        {/* Bottom Sheet */}
        <GestureDetector gesture={panGesture}>
          <Animated.View 
            style={[
              styles.sheet,
              {
                backgroundColor: Colors[theme].background,
                minHeight: calculatedHeight,
              },
              sheetStyle
            ]}
            accessibilityViewIsModal={true}
            accessibilityLabel="Bottom sheet"
          >
            {/* Handle bar */}
            <View 
              style={[
                styles.handle,
                {
                  backgroundColor: Colors[theme].icon,
                  opacity: 0.3,
                }
              ]}
              accessibilityElementsHidden={true}
              importantForAccessibility="no-hide-descendants"
            />
            
            {/* Content */}
            <View style={styles.content}>
              {children}
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  }
);

AuthBottomSheet.displayName = 'AuthBottomSheet';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dim overlay color token equivalent
  },
  overlayPressable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // Shadow/elevation styling
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  handle: {
    alignSelf: 'center',
    width: SHEET_HANDLE.width,
    height: SHEET_HANDLE.height,
    borderRadius: SHEET_HANDLE.borderRadius,
    marginTop: SHEET_HANDLE.marginTop,
    marginBottom: SHEET_HANDLE.marginBottom,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Account for home indicator
  },
});

export default AuthBottomSheet;
