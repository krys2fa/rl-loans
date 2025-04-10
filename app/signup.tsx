// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   Text,
//   StyleSheet,
//   Alert,
//   Image,
// } from "react-native";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { useRouter } from "expo-router";

// export default function Signup() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSignup = async () => {
//     try {
//       const email = `${phone}@example.com`; // convert phone to email
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // Store user profile in Firestore
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         phone,
//         createdAt: new Date(),
//       });

//       Alert.alert("Success", "Account created successfully!");
//       router.replace("/(tabs)/"); // or wherever you want to redirect
//     } catch (error: any) {
//       Alert.alert("Signup Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../assets/images/rl-logo.png")}
//         style={styles.logo}
//       />
//       <Text>Phone Number</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType='phone-pad'
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <Text>Password</Text>
//       <TextInput
//         style={styles.input}
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title='Sign Up' onPress={handleSignup} />
//       <Text onPress={() => router.push("/signin")} style={styles.link}>
//         Already have an account? Sign In
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: "center" },
//   input: { borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 },
//   link: { marginTop: 20, color: "#1e90ff", textAlign: "center" },
//   logo: {
//     width: 120,
//     height: 80,
//     resizeMode: "contain",
//     alignSelf: "center",
//     marginBottom: 30,
//     borderRadius: 20,
//   },
// });

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../assets/images/rl-logo.png")}
        style={styles.logo}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter phone number'
        placeholderTextColor='#ccc'
        keyboardType='phone-pad'
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter password'
        placeholderTextColor='#ccc'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Text onPress={() => router.push("/signin")} style={styles.link}>
        Already have an account?{" "}
        <Text style={{ fontWeight: "bold" }}>Sign In</Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: "#000",
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
});
