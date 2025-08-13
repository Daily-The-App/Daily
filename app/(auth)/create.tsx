import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "@react-native-firebase/auth";

const Create = () => {
  const router = useRouter();
  const email = useSearchParams().get("e");
  const { control, handleSubmit } = useForm({
    defaultValues: { email, password: "" },
  });

  const [focused, setFocused] = useState({ email: false, password: false });

  const onSubmit = async (data: Record<string, any>) => {
    try {
      console.log("Pressed")
      const user = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password,
      );
      // TODO: Add user to global state with Zustand
      router.push("/(tabs)")
    } catch (error) {
      // TODO: Error handling
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.brand}>Daily</Text>
      <Text style={styles.header}>Log in or sign up</Text>
      <Text style={styles.sub}>
        You&apos;ll be able to hold yourself accountable and share goals with
        your friends.
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
                style={[
                  styles.label,
                  focused.email && { color: "#3d53d4ff" },
                ]}
              >
                Email address
              </Text>
              <TextInput
                onFocus={() => {
                  setFocused((prev) => ({
                    ...prev,
                    email: true,
                  }));
                }}
                style={[
                  styles.input,
                  focused.email &&
                  { borderColor: "#3d53d4ff" },
                ]}
                onBlur={() => {
                  onBlur();
                  setFocused((prev) => ({
                    ...prev,
                    email: false,
                  }));
                }}
                onChangeText={onChange}
                value={value as string}
              />
            </View>
          );
        }}
        name={"email"}
      />
      <Controller
        control={control}
        name={"password"}
        rules={{
          required: true,
          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            (
              <View style={styles.wrapper}>
                <Text
                  style={[
                    styles.label,
                    focused.password &&
                    { color: "#3d53d4ff" },
                  ]}
                >
                  Password
                </Text>
                <TextInput
                  secureTextEntry
                  onFocus={() => {
                    setFocused((prev) => ({
                      ...prev,
                      password: true,
                    }));
                  }}
                  style={[
                    styles.input,
                    focused.password &&
                    { borderColor: "#3d53d4ff" },
                  ]}
                  onBlur={() => {
                    onBlur();
                    setFocused((prev) => ({
                      ...prev,
                      password: false,
                    }));
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )
          );
        }}
      />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, {
          borderWidth: 1,
          borderColor: "#b1b1b16b",
        }]}
      >
        <Text style={styles.buttonText}>Create</Text>
      </Pressable>
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

export default Create;
