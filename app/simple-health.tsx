import { View, Text, StyleSheet } from "react-native";

export default function SimpleHealth() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Health Check</Text>
      <Text>This page doesn't import Firebase at all.</Text>
      <Text>If you see this, React Native Web is working.</Text>
      <Text>Timestamp: {new Date().toISOString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 8,
    backgroundColor: "#f0f0f0"
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16,
    color: "#333"
  },
});
