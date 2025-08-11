import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export function DividerOr() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const lineColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <Text style={[styles.text, { color: textColor }]}>OR</Text>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
});
