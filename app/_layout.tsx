import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useAuth, AuthProvider } from "../context/AuthContext";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    Quicksand: require("../assets/fonts/Quicksand.ttf"),
  });

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loading]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user, router]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='credit-check'
          options={{ headerShown: true, headerTitle: "" }}
        />
        <Stack.Screen
          name='loan-history'
          options={{ headerShown: true, headerTitle: "" }}
        />
        <Stack.Screen
          name='payment-schedule'
          options={{ headerShown: true, headerTitle: "" }}
        />
        <Stack.Screen
          name='payments'
          options={{ headerShown: true, headerTitle: "" }}
        />
        <Stack.Screen
          name='support'
          options={{ headerShown: true, headerTitle: "" }}
        />
        <Stack.Screen
          name='withdrawals'
          options={{ headerShown: true, headerTitle: "" }}
        />
        <Stack.Screen
          name='signin'
          options={{ headerShown: false, headerTitle: "" }}
        />
        <Stack.Screen
          name='signup'
          options={{ headerShown: false, headerTitle: "" }}
        />
        <Stack.Screen name='+not-found' />
      </Stack>
    </AuthProvider>
  );
}
