import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Signin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const email = `${phone}@example.com`;

    try {
      // Attempt to log in with the phone and password
      await login(email, password);
    } catch (error: any) {
      Alert.alert("Login Error", "Invalid credentials. Please try again.");
      return;
    }

    // Check if the user has completed the onboarding process after login
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // If the user has not completed onboarding, redirect to the onboarding screens
        if (!userData?.onboardingCompleted) {
          router.replace("/onboarding");
        } else {
          // Otherwise, proceed to the main app (home screen)
          router.replace("/(tabs)/");
        }
      } else {
        Alert.alert("Error", "User data not found.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/rl-logo.png")}
        style={styles.logo}
      />
      <Text>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType='phone-pad'
        value={phone}
        onChangeText={setPhone}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title='Sign In' onPress={handleLogin} />
      <Text onPress={() => router.push("/signup")} style={styles.link}>
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: { borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 },
  link: { marginTop: 20, color: "blue", textAlign: "center" },
  logo: {
    width: 120,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 20,
  },
});
