import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import firebaseApp, { ReactNativeFirebase, getApps, initializeApp } from "@react-native-firebase/app";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { Platform } from "react-native";

type IUsedAndroidProps = keyof typeof androidCredentials;
type IAndroidCredentials = Omit<
  ReactNativeFirebase.FirebaseAppOptions,
  IUsedAndroidProps
>;

const androidCredentials = {
  apiKey: "AIzaSyBw5kinb_bdU64LBN-qZHxPutzzpP7b2HM",
  "projectId": "daily-95e92",
  "appId": "1:62904971068:android:3da01181c79d1e3514f839",
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId: "",
  appId: "",
  apiKey: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: "",
  projectId: "",
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials as IAndroidCredentials,
  ios: iosCredentials,
});

// Root layout component for Daily app
// Updated for branch protection testing
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    // Initialize Firebase if not already initialized
    let unsub;
    (async () => {
      if (getApps().length === 0) {
        await initializeApp(
          credentials as ReactNativeFirebase.FirebaseAppOptions,
        );
      }
      const auth = getAuth();
      unsub = onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed. user:", !!user);
        if (!user) {
          router.replace("/(auth)");
        }
      });
    })();
  }, [router]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
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
