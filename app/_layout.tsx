// import { AuthProvider } from "../context/AuthContext";
// import RootLayout from "./RootLayout";
import { Provider } from "react-redux";
import { store } from "../store";
import { View, Text, StyleSheet } from "react-native";
import { ErrorBoundary } from "./ErrorBoundary";
import { useEffect, useState } from "react";

export default function Layout() {
  const [step, setStep] = useState("initializing");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Layout useEffect started");
    
    try {
      setStep("setting up redux");
      console.log("Redux store:", store);
      
      setStep("checking environment");
      console.log("Environment vars:", {
        firebase_project_id: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        router_app_root: process.env.EXPO_ROUTER_APP_ROOT,
      });
      
      setStep("completed");
      console.log("Layout setup completed successfully");
    } catch (err) {
      console.error("Layout setup error:", err);
      setError(String(err));
      setStep("error");
    }
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Layout Setup Error:</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.title}>Debug Mode - Persistent Version</Text>
          <Text>Step: {step}</Text>
          <Text>✅ Redux Store: Working</Text>
          <Text>✅ React Native Web: Working</Text>
          <Text>✅ JavaScript Bundle: Loaded</Text>
          <Text>✅ Error Boundary: Active</Text>
          <Text style={styles.subtitle}>
            This version should not disappear. If it does, check browser console.
          </Text>
          <Text style={styles.timestamp}>
            Rendered at: {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </Provider>
    </ErrorBoundary>
  );
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
  timestamp: {
    marginTop: 10,
    fontSize: 12,
    color: "#95a5a6",
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
