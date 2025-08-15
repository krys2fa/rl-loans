import { View, Text, StyleSheet } from "react-native";

// Completely static component - no hooks, no effects, no imports
export default function StaticDebug() {
  const renderTime = new Date().toISOString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Static Debug Page</Text>
      <Text style={styles.status}>🟢 JavaScript Loaded</Text>
      <Text style={styles.status}>🟢 React Native Web Working</Text>
      <Text style={styles.status}>🟢 No useEffect hooks</Text>
      <Text style={styles.status}>🟢 No external imports</Text>
      <Text style={styles.info}>This page should NEVER disappear.</Text>
      <Text style={styles.info}>
        If it does, the issue is in Expo Router itself.
      </Text>
      <Text style={styles.timestamp}>Rendered: {renderTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f5e8",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 24,
    textAlign: "center",
  },
  status: {
    fontSize: 16,
    color: "#388e3c",
    marginVertical: 4,
  },
  info: {
    fontSize: 14,
    color: "#1b5e20",
    textAlign: "center",
    marginVertical: 2,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: "#757575",
    marginTop: 20,
    fontFamily: "monospace",
  },
});
