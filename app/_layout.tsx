// import { AuthProvider } from "../context/AuthContext";
// import RootLayout from "./RootLayout";
import { Provider } from "react-redux";
import { store } from "../store";
import { View, Text, StyleSheet } from "react-native";
import { ErrorBoundary } from "./ErrorBoundary";
import { useEffect, useState } from "react";

// Force all errors to be visible with alerts
if (typeof window !== 'undefined') {
  // Capture all unhandled errors
  window.addEventListener('error', (event) => {
    const errorMsg = `🚨 JAVASCRIPT ERROR!\nMessage: ${event.error?.message || event.message}\nFile: ${event.filename}:${event.lineno}\nStack: ${event.error?.stack || 'No stack'}`;
    console.error('🚨 Global error:', event.error);
    alert(errorMsg);
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const errorMsg = `🚨 PROMISE REJECTION!\nReason: ${event.reason}`;
    console.error('🚨 Promise rejection:', event.reason);
    alert(errorMsg);
  });
}

export default function Layout() {
  const [step, setStep] = useState("initializing");
  const [error, setError] = useState<string | null>(null);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
    console.log(`🚀 Layout useEffect started (render #${renderCount + 1})`);

    try {
      console.log("⚙️ Setting up Redux store");
      if (!store) {
        throw new Error("Redux store is undefined!");
      }

      console.log("🔍 Checking environment variables");
      const envVars = {
        firebase_project_id: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        router_app_root: process.env.EXPO_ROUTER_APP_ROOT,
      };
      console.log("Environment vars:", envVars);

      setStep("completed");
      console.log("✅ Layout setup completed successfully");
    } catch (err) {
      const errorMsg = `❌ Setup error: ${err}`;
      console.error(errorMsg);
      setError(String(err));
      setStep("error");
    }
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>🚨 Layout Setup Error</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.title}>🚨 ERROR ALERT MODE ACTIVE 🚨</Text>
          <Text>📊 Render Count: {renderCount}</Text>
          <Text>🎯 Step: {step}</Text>
          <Text>✅ Redux Store: Working</Text>
          <Text>✅ React Native Web: Working</Text>
          <Text>✅ JavaScript Bundle: Loaded</Text>
          <Text>✅ Error Boundary: Active</Text>
          <Text>🚨 Global Error Alerts: ACTIVE</Text>
          <Text style={styles.warning}>
            ANY ERROR WILL SHOW AS AN ALERT POPUP
          </Text>
          <Text style={styles.subtitle}>
            If this disappears without an alert, the issue is NOT a JavaScript error.
            Check: Network, Vercel routing, or browser compatibility.
          </Text>
          <Text style={styles.timestamp}>
            ⏰ Last render: {new Date().toLocaleTimeString()}
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
    backgroundColor: "#fff3cd",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#856404",
    textAlign: "center",
  },
  warning: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc3545",
    textAlign: "center",
    marginVertical: 16,
    padding: 10,
    backgroundColor: "#f8d7da",
    borderRadius: 4,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    color: "#6c757d",
    lineHeight: 20,
  },
  timestamp: {
    marginTop: 10,
    fontSize: 12,
    color: "#adb5bd",
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
  },
});
