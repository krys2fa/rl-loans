// app/onboarding/id-back.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp } from "react-native-reanimated";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

export default function IDBack() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadToFirebase = async () => {
    if (!image) return;

    setLoading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = `id-back-${Date.now()}.jpg`;
    const imageRef = ref(storage, `ids/${filename}`);

    try {
      await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(imageRef);
      setLoading(false);
      router.push("/onboarding/complete");
    } catch (error) {
      setLoading(false);
      Alert.alert("Upload failed", "Please try again.");
    }
  };

  return (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.container}>
      <Text style={styles.title}>Upload Back of ID</Text>
      <Text style={styles.subtitle}>Ensure it's fully visible</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>Tap to take a photo</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: image ? "#4a90e2" : "#ccc" }]}
        onPress={uploadToFirebase}
        disabled={!image || loading}
      >
        {loading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.buttonText}>Finish</Text>
        )}
      </TouchableOpacity>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: "100%" }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Quicksand",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    fontFamily: "Quicksand",
    marginBottom: 30,
  },
  uploadBox: {
    height: 250,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  uploadText: {
    fontSize: 16,
    color: "#999",
    fontFamily: "Quicksand",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginTop: 30,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#4a90e2",
    borderRadius: 4,
  },
});
