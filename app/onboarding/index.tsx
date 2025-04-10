import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";
const steps = [
  { label: "Take a Selfie", route: "selfie" },
  { label: "Front of ID", route: "id-front" },
  { label: "Back of ID", route: "id-back" },
];

export default function Onboarding() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => {
    const next = steps[stepIndex];
    router.push(`/onboarding/${next.route}`);
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify Your Identity</Text>
      <Text style={styles.subtitle}>
        Step {stepIndex + 1} of {steps.length}: {steps[stepIndex].label}
      </Text>

      <Progress.Bar
        progress={(stepIndex + 1) / steps.length}
        width={null}
        height={10}
        color='#4a90e2'
        borderRadius={10}
        borderWidth={0}
        style={{ marginVertical: 20 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Start</Text>
        <Ionicons name='arrow-forward' size={24} color='#fff' />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Quicksand",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    fontFamily: "Quicksand",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
