import { View, Text, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import RootLayout from "./RootLayout";

// Simplified AuthProvider that doesn't use Firebase
const SimpleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default function DebugLayout() {
  return (
    <SimpleAuthProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.title}>Debug Mode</Text>
          <Text>This bypasses Firebase completely.</Text>
          <Text>If you see this, Redux and React Native Web work.</Text>
        </View>
      </Provider>
    </SimpleAuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#e0f0ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0066cc",
  },
});
