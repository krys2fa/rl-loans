import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useAuth } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    Quicksand: require("../assets/fonts/Quicksand.ttf"),
  });

  const { loading } = useAuth();

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loading]);

  if (!loaded || loading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="health"
        options={{ headerShown: true, title: "Health" }}
      />
      <Stack.Screen
        name="credit-check"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="loan-history"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="payment-schedule"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="payments"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="support"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="withdrawals"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="signin"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="onboarding/id-back"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="onboarding/id-front"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="onboarding/selfie"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="onboarding/index"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
