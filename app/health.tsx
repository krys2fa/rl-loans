import { View, Text, StyleSheet } from "react-native";

export default function Health() {
  // Values are inlined at build time by Expo (for EXPO_PUBLIC_* only)
  const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "<unset>";
  const bucket = process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "<unset>";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Check</Text>
      <Text>JS loaded and rendered.</Text>
      <Text>EXPO_PUBLIC_FIREBASE_PROJECT_ID: {String(projectId)}</Text>
      <Text>EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: {String(bucket)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
});
