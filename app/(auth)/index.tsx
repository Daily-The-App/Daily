import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthBottomSheet } from "@/components/bottom-sheet";
import { useNavigation } from "expo-router";
import GoogleButton from "@/components/GoogleButton";
import AppleButton from "@/components/AppleButton";

export default function AuthIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Brand */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>Daily</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.authButtons}>
            <AppleButton />
            <GoogleButton />
            {/* Auth Buttons */}
            <Pressable
              style={styles.authButton}
              onPress={() => {
                router.push("/(auth)/sign-up");
              }}
            >
              <Text style={styles.authButtonText}>Sign up</Text>
            </Pressable>
            <Pressable
              style={[styles.authButton, {
                "backgroundColor": "transparent",
                borderWidth: 1,
                borderColor: "#b1b1b16b",
              }]}
            >
              <Text style={styles.authButtonText}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandContainer: {
    marginBottom: 60,
  },
  brandText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -1,
  },
  welcomeContainer: {
    marginBottom: 80,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonWrapper: {
    backgroundColor: "#000",
    padding: 24,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  authButtons: {
    height: "100%",
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  authButton: {
    paddingVertical: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#343434",
    borderRadius: 12,
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
});
