import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="log-in"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="sign-up"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
