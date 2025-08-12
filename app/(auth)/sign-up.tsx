import AppleButton from "@/components/AppleButton";
import DivideOR from "@/components/DivideOR";
import GoogleButton from "@/components/GoogleButton";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { "email": "", "password": "" },
  });

  const [focused, setFocused] = useState(false);

  const onSubmit = (data: Record<string, any>) => console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.brand}>Daily</Text>
      <Text style={styles.header}>Log in or sign up</Text>
      <Text style={styles.sub}>
        You'll be able to hold yourself accountable and share goals with your
        friends.
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
          // https://emailregex.com/
          pattern:
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        }}
        render={(
          { field: { onChange, onBlur, value } },
        ): React.ReactElement => {
          return (
            <View style={styles.wrapper}>
              <Text
                style={[styles.label, focused && { color: "#3d53d4ff" }]}
              >
                Email address
              </Text>
              <TextInput
                onFocus={() => {
                  setFocused(true);
                }}
                style={[styles.input, focused && { borderColor: "#3d53d4ff" }]}
                onBlur={() => {
                  onBlur();
                  setFocused(false);
                }}
                onChangeText={onChange}
                value={value}
              />
              <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          );
        }}
        name={"email"}
      />
      <View style={styles.dividerWrapper}>
        <DivideOR />
      </View>
      <View style={styles.buttonWrapper}>
        <View>
          <GoogleButton
            classes={{
              button: {
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#8b8b8b",
                borderRadius: 99,
              },
              text: { color: "#2A2A2A" },
            }}
          />
          <AppleButton
            classes={{
              button: {
                borderWidth: 1,
                borderColor: "#8b8b8b",
                borderRadius: 99,
                marginTop: 24,
              },
              text: {
                color: "#2A2A2A",
              },
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 12,
    fontWeight: 500,
  },
  header: {
    fontSize: 32,
    textAlign: "center",
  },
  sub: {
    fontSize: 15,
    color: "#8b8b8bff",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 20,
  },
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 16,
  },
  label: {
    display: "flex",
    position: "absolute",
    paddingHorizontal: 4,
    left: 15,
    top: -10,
    boxSizing: "border-box",
    backgroundColor: "white",
    zIndex: 10,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#8b8b8b",
    borderRadius: 99,
  },
  buttonWrapper: {
    width: "100%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: "100%",
    padding: 15,
    borderRadius: 99,
    marginTop: 24,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  dividerWrapper: {
    paddingHorizontal: 30,
  },
});

export default Signup;
