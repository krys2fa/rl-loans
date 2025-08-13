import React, { useState } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../features/authSlice";
import type { RootState } from "../store";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import * as Animatable from "react-native-animatable";

export default function Signin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  const handleLogin = async () => {
    const trimmedPhone = phone.trim();

    if (!trimmedPhone || trimmedPhone.length < 9 || !password) {
      Alert.alert(
        "Missing or invalid input",
        "Please enter a valid phone number and password."
      );
      return;
    }

    const email = `${trimmedPhone}@example.com`;
    dispatch(setLoading(true));

    try {
      // Replace with your Firebase login logic
      await auth.signInWithEmailAndPassword(email, password);
      const loggedInUser = auth.currentUser;
      if (!loggedInUser) {
        Alert.alert("Login Error", "User not found after login.");
        dispatch(setError("User not found after login."));
        return;
      }
      dispatch(
        setUser({ uid: loggedInUser.uid, email: loggedInUser.email ?? "" })
      );
      const userDocRef = doc(db, "users", loggedInUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData?.onboardingCompleted) {
          router.replace("/onboarding");
        } else {
          router.replace("/(tabs)/");
        }
      } else {
        Alert.alert("Error", "User data not found.");
      }
    } catch (error: any) {
      console.error("Sign-in failed", error.code);
      Alert.alert("Login Error", "Invalid credentials. Please try again.");
      dispatch(setError(error.message || "Login Error"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../assets/images/rl-logo.png")}
        style={styles.logo}
      />

      <Animatable.Text
        animation="fadeInDown"
        delay={200}
        style={styles.uxMessage}
      >
        👋 Welcome back! Please sign in to continue
      </Animatable.Text>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isLoading ? (
        <Animatable.View
          animation="pulse"
          easing="ease-in-out"
          iterationCount="infinite"
          style={[styles.button, { backgroundColor: "#b0c4de" }]}
        >
          <Text style={styles.buttonText}>Signing In...</Text>
        </Animatable.View>
      ) : (
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      )}

      <Text onPress={() => router.push("/signup")} style={styles.link}>
        Don’t have an account?{" "}
        <Text style={{ fontWeight: "bold" }}>Sign up</Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 130,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 40,
    opacity: 0.9,
  },
  label: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
    fontFamily: "Quicksand",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    color: "#000",
  },
  button: {
    backgroundColor: "#1e90ff",
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#1e90ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Quicksand",
  },
  link: {
    marginTop: 25,
    textAlign: "center",
    color: "#1e90ff",
    fontSize: 14,
  },
  uxMessage: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 15,
    color: "#1e88e5",
    fontFamily: "Quicksand",
  },
});
