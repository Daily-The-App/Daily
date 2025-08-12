import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { onAuthStateChanged } from "@react-native-firebase/auth";
import { initializeFirebaseIfNeeded } from "@/lib/firebase";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect } from "react";

// Root layout component for Daily app
// Updated for branch protection testing
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    try {
      // Initialize Firebase and get auth instance
      const auth = initializeFirebaseIfNeeded();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed. user:", !!user);
        if (!user) {
          router.replace("/(auth)");
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error("Firebase auth initialization error:", error);
    }
  }, [router]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
