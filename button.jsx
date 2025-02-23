//button
import { useRouter } from "expo-router";
export function Button() {
    const styles = {
        borderRadius: 20,
        backgroundColor: "blue", }
    const router = useRouter();

    return (
        <Button title="Compute Path" />
    );
}

//onPress={() => router.push("/page2")}