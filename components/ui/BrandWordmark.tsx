import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BrandWordmarkProps {
  variant?: 'light' | 'dark';
  center?: boolean;
  showDot?: boolean;
}

export function BrandWordmark({ variant = 'light', center = false, showDot = false }: BrandWordmarkProps) {
  const textColor = variant === 'light' ? '#000000' : '#ffffff';

  return (
    <View style={[styles.container, center && styles.centered]}>
      <Text style={[styles.text, { color: textColor }]}>
        ChatGPT
      </Text>
      {showDot && (
        <View style={[styles.dot, { backgroundColor: textColor }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 4,
  },
});
