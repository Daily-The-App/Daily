import { StyleSheet, Text, View } from "react-native";

const DivideOR = () => {
    return (
        <View style={styles.container}>
            <View style={styles.left} />
            <Text style={styles.text}>OR</Text>
            <View style={styles.right} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 24
    },
    left: {
        display: "flex",
        width: "42.5%",
        height: 1,
        backgroundColor: "#d8d8d8"
    },
    right: {
        display: "flex",
        height: 1,
        width: "42.5%",
        backgroundColor: "#d8d8d8",
    },
    text: {
        fontSize: 16,
        paddingHorizontal: 12
    },
});

export default DivideOR;
