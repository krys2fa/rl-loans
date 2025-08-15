import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useAuth } from "../context/AuthContext";
import { View, Text, StyleSheet } from "react-native";

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

  // FIXED: Instead of returning null (which causes blank page), show loading
  if (!loaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading App...</Text>
        <Text style={styles.debugText}>
          Fonts loaded: {loaded ? "✅" : "⏳"}
        </Text>
        <Text style={styles.debugText}>
          Auth loaded: {!loading ? "✅" : "⏳"}
        </Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="health"
        options={{ headerShown: true, title: "Health" }}
      />
      <Stack.Screen
        name="simple-health"
        options={{ headerShown: true, title: "Simple Health" }}
      />
      <Stack.Screen
        name="static-debug"
        options={{ headerShown: true, title: "Static Debug" }}
      />
      <Stack.Screen
        name="debug-layout"
        options={{ headerShown: true, title: "Debug Layout" }}
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  debugText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
});
