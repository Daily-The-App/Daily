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
          name="auth"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="create"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
