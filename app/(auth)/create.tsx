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

const Create = () => {
    const { control } = useForm({
        defaultValues: { "password": "" },
    });

    const [focused, setFocused] = useState(false);

    const onSubmit = (data: Record<string, any>) => console.log(data);
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
                    // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
                    pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                }}
                render={(
                    { field: { onChange, onBlur, value } },
                ): React.ReactElement => {
                    return (
                        <View style={styles.wrapper}>
                            <Text
                                style={[
                                    styles.label,
                                    focused && { color: "#3d53d4ff" },
                                ]}
                            >
                                Password
                            </Text>
                            <TextInput
                                onFocus={() => {
                                    setFocused(true);
                                }}
                                style={[
                                    styles.input,
                                    focused && { borderColor: "#3d53d4ff" },
                                ]}
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
                name={"password"}
            />
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