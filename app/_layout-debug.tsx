import { View, Text, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";

// Bypass Firebase and AuthProvider completely for debugging
export default function DebugMainLayout() {
  try {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.title}>Debug Main Layout</Text>
          <Text>Redux Provider: ✅ Working</Text>
          <Text>React Native Web: ✅ Working</Text>
          <Text>No Firebase imports: ✅ Working</Text>
          <Text style={styles.note}>
            If you see this, the issue is in Firebase/AuthProvider
          </Text>
        </View>
      </Provider>
    );
  } catch (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Error in Debug Layout:</Text>
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
    gap: 12,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  note: {
    marginTop: 20,
    fontStyle: "italic",
    textAlign: "center",
    color: "#7f8c8d",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee",
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c0392b",
    marginBottom: 10,
  },
  errorText: {
    color: "#c0392b",
    textAlign: "center",
  },
});
