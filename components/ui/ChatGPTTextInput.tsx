import React, { useState } from 'react';
import { TextInput, StyleSheet, TextInputProps, KeyboardTypeOptions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface ChatGPTTextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
}

export function ChatGPTTextInput({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  testID,
}: ChatGPTTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    background: isDark ? '#1f2937' : '#ffffff',
    border: isDark ? '#374151' : '#d1d5db',
    borderFocused: isDark ? '#ffffff' : '#000000',
    text: isDark ? '#ffffff' : '#000000',
    placeholder: isDark ? '#6b7280' : '#9ca3af',
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(
        isFocused ? colors.borderFocused : colors.border,
        { duration: 200 }
      ),
      shadowOpacity: withTiming(isFocused ? 0.1 : 0, { duration: 200 }),
    };
  });

  return (
    <AnimatedTextInput
      style={[
        styles.input,
        {
          backgroundColor: colors.background,
          color: colors.text,
        },
        animatedStyle,
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      testID={testID}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '400',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    elevation: 2,
  },
});
