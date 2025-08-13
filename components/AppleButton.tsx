import { Pressable, StyleSheet, Text } from "react-native";
import { AppleIcon } from "./ui/AuthIcons";
import { Classes } from "./GoogleButton";

const AppleButton = ({classes}: {classes?: Classes}) => {
    return (
        <Pressable style={[styles.button, classes && classes.button]}>
            <AppleIcon size={18} />
            <Text style={[styles.authButtonText, classes && classes.text]}>Continue with Apple</Text>
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
        backgroundColor: "white",
        borderRadius: 12,
    },
    authButtonText: {
        fontSize: 18,
        fontWeight: "400",
        color: "black",
    },
});

export default AppleButton;

