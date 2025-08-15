// import { AuthProvider } from "../context/AuthContext";
// import RootLayout from "./RootLayout";
import { Provider } from "react-redux";
import { store } from "../store";
import { View, Text, StyleSheet } from "react-native";

export default function Layout() {
  // Temporarily bypass Firebase for debugging
  try {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.title}>Debug Mode - No Firebase</Text>
          <Text>✅ Redux Store: Working</Text>
          <Text>✅ React Native Web: Working</Text>
          <Text>✅ JavaScript Bundle: Loaded</Text>
          <Text style={styles.subtitle}>
            If you see this, the blank page was caused by Firebase/AuthProvider
          </Text>
        </View>
      </Provider>
    );
  } catch (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Layout Error:</Text>
        <Text style={styles.errorText}>{String(error)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 16,
    backgroundColor: "#f0f8ff",
    padding: 30,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    color: "#7f8c8d",
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe6e6",
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: 16,
  }
});
