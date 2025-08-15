// Complete error visibility version
import { Provider } from "react-redux";
import { store } from "../store";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ErrorBoundary } from "./ErrorBoundary";
import { useEffect, useState } from "react";

// Force ALL errors to be visible immediately
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('🚨 Global error caught:', event.error);
    alert(`🚨 ERROR DETECTED!\nMessage: ${event.error.message}\nFile: ${event.filename}:${event.lineno}\nStack: ${event.error.stack}`);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled promise rejection:', event.reason);
    alert(`🚨 PROMISE REJECTION!\nReason: ${event.reason}`);
  });
  
  // Override console.error to also show alerts
  const originalConsoleError = console.error;
  console.error = (...args) => {
    originalConsoleError(...args);
    if (args.length > 0) {
      alert(`🚨 CONSOLE ERROR!\n${args.join(' ')}`);
    }
  };
}

export default function Layout() {
  const [step, setStep] = useState("initializing");
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [renderCount, setRenderCount] = useState(0);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log(logEntry);
    setLogs(prev => [...prev.slice(-10), logEntry]); // Keep last 10 logs
  };

  useEffect(() => {
    setRenderCount(prev => prev + 1);
    addLog(`🚀 Layout useEffect started (render #${renderCount + 1})`);

    const timeout = setTimeout(() => {
      try {
        addLog("⚙️ Setting up Redux store");
        if (!store) {
          throw new Error("Redux store is undefined!");
        }
        console.log("Redux store state:", store.getState());

        addLog("🔍 Checking environment variables");
        const envVars = {
          firebase_project_id: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
          router_app_root: process.env.EXPO_ROUTER_APP_ROOT,
          node_env: process.env.NODE_ENV,
        };
        console.log("Environment vars:", envVars);

        addLog("✅ All checks completed successfully");
        setStep("completed");
      } catch (err) {
        const errorMsg = `❌ Setup error: ${err}`;
        console.error(errorMsg);
        addLog(errorMsg);
        setError(String(err));
        setStep("error");
      }
    }, 100); // Small delay to ensure proper state updates

    return () => {
      clearTimeout(timeout);
      addLog("🧹 Cleanup function called");
    };
  }, []);

  // Add visibility change listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      addLog(`👁️ Page visibility: ${document.visibilityState}`);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>🚨 Layout Setup Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <ScrollView style={styles.logsScrollView}>
          <Text style={styles.logsTitle}>📋 Error Logs:</Text>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logEntry}>{log}</Text>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🔍 Ultra Debug Mode - Error Alerts Active</Text>
          <Text style={styles.status}>📊 Render Count: {renderCount}</Text>
          <Text style={styles.status}>🎯 Current Step: {step}</Text>
          <Text style={styles.status}>✅ Redux Store: Working</Text>
          <Text style={styles.status}>✅ React Native Web: Working</Text>
          <Text style={styles.status}>✅ JavaScript Bundle: Loaded</Text>
          <Text style={styles.status}>✅ Error Boundary: Active</Text>
          <Text style={styles.status}>🚨 Global Error Handlers: Active</Text>
          <Text style={styles.status}>📱 Console.error Override: Active</Text>
          
          <View style={styles.logsContainer}>
            <Text style={styles.logsTitle}>📋 Activity Log:</Text>
            {logs.map((log, index) => (
              <Text key={index} style={styles.logEntry}>{log}</Text>
            ))}
          </View>
          
          <Text style={styles.warning}>
            🚨 ANY ERROR WILL SHOW AS AN ALERT 🚨
          </Text>
          <Text style={styles.subtitle}>
            If this page disappears without an alert, the issue is:
            1. Network connectivity
            2. Vercel routing issue  
            3. Browser/device specific problem
          </Text>
          <Text style={styles.timestamp}>
            ⏰ Last render: {new Date().toLocaleTimeString()}
          </Text>
        </ScrollView>
      </Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#fff3cd",
    padding: 20,
    minHeight: "100vh",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#856404",
    textAlign: "center",
  },
  status: {
    fontSize: 14,
    color: "#495057",
    marginVertical: 2,
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
  logsContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    maxWidth: 600,
    marginVertical: 16,
  },
  logsScrollView: {
    maxHeight: 200,
    width: "100%",
  },
  logsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 8,
  },
  logEntry: {
    fontSize: 12,
    color: "#6c757d",
    fontFamily: "monospace",
    marginVertical: 1,
  },
  subtitle: {
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
    color: "#6c757d",
    lineHeight: 18,
    maxWidth: 500,
  },
  timestamp: {
    fontSize: 12,
    color: "#adb5bd",
    marginTop: 12,
    fontFamily: "monospace",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8d7da",
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#721c24",
    marginBottom: 10,
  },
  errorText: {
    color: "#721c24",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
  },
});
