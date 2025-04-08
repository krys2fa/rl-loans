import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function CompleteScreen() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const completeOnboarding = async () => {
      if (user) {
        // Update onboarding status in Firebase
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { onboardingCompleted: true });

        // Redirect to home after completing onboarding
        router.replace("/index");
      }
    };

    completeOnboarding();
  }, [user, router]);

  return (
    <View style={styles.container}>
      <AntDesign name='checkcircle' size={100} color='#4CAF50' />
      <Text style={styles.title}>Onboarding Complete!</Text>
      <Text style={styles.subtitle}>
        Your details have been successfully uploaded and you're ready to use the
        app.
      </Text>
      <Button title='Go to Home' onPress={() => router.replace("/index")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
});
