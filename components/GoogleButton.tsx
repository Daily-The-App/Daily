import { Pressable, StyleSheet, Text } from "react-native";
import { GoogleIcon } from "./ui/AuthIcons";

const GoogleButton = () => {
    return (
        <Pressable style={styles.button}>
            <GoogleIcon size={17} />
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
