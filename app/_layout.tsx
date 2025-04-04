import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    Quicksand: require("../assets/fonts/Quicksand.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
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
      <Stack.Screen name='+not-found' />
    </Stack>
  );
}
