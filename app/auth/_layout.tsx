import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function AuthLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <ActivityIndicator size="large" />;
    }

    if (isSignedIn) {
        return <Redirect href="/" />;
    }

    return <Slot />;
}
