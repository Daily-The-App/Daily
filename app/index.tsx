import { Button, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import auth from "./(auth)/auth";
import { getAuth } from "@react-native-firebase/auth";

const HomePage = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>Home Page</Text>
                <Button title="sign out" onPress={() => getAuth().signOut()} />
            </View>
        </SafeAreaView>
    )
}

export default HomePage;