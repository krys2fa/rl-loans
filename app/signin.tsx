// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   Text,
//   StyleSheet,
//   Alert,
//   Image,
// } from "react-native";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "expo-router";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// export default function Signin() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, user } = useAuth();
//   const router = useRouter();

//   const handleLogin = async () => {
//     const email = `${phone}@example.com`;

//     try {
//       // Attempt to log in with the phone and password
//       await login(email, password);
//     } catch (error: any) {
//       Alert.alert("Login Error", "Invalid credentials. Please try again.");
//       return;
//     }

//     // Check if the user has completed the onboarding process after login
//     if (user) {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();

//         // If the user has not completed onboarding, redirect to the onboarding screens
//         if (!userData?.onboardingCompleted) {
//           router.replace("/onboarding");
//         } else {
//           // Otherwise, proceed to the main app (home screen)
//           router.replace("/(tabs)/");
//         }
//       } else {
//         Alert.alert("Error", "User data not found.");
//       }
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
//       <Button title='Sign In' onPress={handleLogin} />
//       <Text onPress={() => router.push("/signup")} style={styles.link}>
//         Don’t have an account? Sign up
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: "center" },
//   input: { borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 },
//   link: { marginTop: 20, color: "blue", textAlign: "center" },
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
      await login(email, password);
    } catch (error: any) {
      Alert.alert("Login Error", "Invalid credentials. Please try again.");
      return;
    }

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
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

      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

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
    color: "#fff",
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
