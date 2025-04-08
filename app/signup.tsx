import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const email = `${phone}@example.com`; // convert phone to email
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Store user profile in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        phone,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");
      router.replace("/(tabs)/"); // or wherever you want to redirect
    } catch (error: any) {
      Alert.alert("Signup Error", error.message);
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
      <Button title='Sign Up' onPress={handleSignup} />
      <Text onPress={() => router.push("/signin")} style={styles.link}>
        Already have an account? Sign In
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
