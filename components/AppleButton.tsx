import { Pressable, StyleSheet, Text } from "react-native";
import { AppleIcon } from "./ui/AuthIcons";

const AppleButton = () => {
    return (
        <Pressable style={styles.button}>
            <AppleIcon size={18} />
            <Text style={styles.authButtonText}>Continue with Google</Text>
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
