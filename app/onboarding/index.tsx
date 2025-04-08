// app/onboarding/index.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const steps = [
  { key: "Step1_Selfie", label: "Selfie" },
  { key: "Step2_IDFront", label: "Front of ID" },
  { key: "Step3_IDBack", label: "Back of ID" },
];

export default function OnboardingIndex() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/onboarding/selfie");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identity Verification</Text>
      <Text style={styles.subtitle}>Let's get to know you better</Text>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={step.key} style={styles.stepItem}>
            <Ionicons
              name='checkmark-done-circle-outline'
              size={30}
              color='#1e88e5'
            />
            <Text style={styles.stepText}>{step.label}</Text>
            {index !== steps.length - 1 && <View style={styles.stepLine} />}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start Verification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Quicksand",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 40,
    fontFamily: "Quicksand",
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  stepItem: {
    alignItems: "center",
  },
  stepText: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: "Quicksand",
  },
  stepLine: {
    height: 1,
    width: 30,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#1e88e5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
});
