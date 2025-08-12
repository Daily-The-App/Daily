import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { GoogleIcon } from "./ui/AuthIcons";
import { CSSProperties } from "react";

export interface Classes {
    button?: ViewStyle
    text?: TextStyle
}

const GoogleButton = ({classes}: {classes: Classes}) => {
    return (
        <Pressable style={[styles.button, classes && classes.button]}>
            <GoogleIcon size={17} />
            <Text style={[styles.authButtonText, classes && classes.text]}>Continue with Google</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        display: "flex",
        gap: 12,
        flexDirection: "row",
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

export default GoogleButton;
