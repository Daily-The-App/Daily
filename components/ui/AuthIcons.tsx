import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

interface IconProps {
  size?: number;
  color?: string;
}

// Apple logo component - using Ionicons logo-apple with proper sizing
export const AppleIcon = ({ size = 20, color = '#000' }: IconProps) => (
  <Ionicons name="logo-apple" size={size} color={color} />
);

// Google logo component - using official multi-color G logo via expo-image for crispness
export const GoogleIcon = ({ size = 20 }: Omit<IconProps, 'color'>) => (
  <Image
    source={require('@/assets/images/google-logo.svg')}
    style={{ width: size, height: size }}
    contentFit="contain"
  />
);
