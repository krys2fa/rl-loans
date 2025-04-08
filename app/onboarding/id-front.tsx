// app/onboarding/id-front.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function IDFront() {
  const [image, setImage] = useState<string | null>(null);
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

  const handleNext = () => {
    if (image) {
      router.push("/onboarding/id-back");
    }
  };

  return (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.container}>
      <Text style={styles.title}>Upload Front of ID</Text>
      <Text style={styles.subtitle}>Make sure it’s clearly visible</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>Tap to take a photo</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: image ? "#4a90e2" : "#ccc" }]}
        onPress={handleNext}
        disabled={!image}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
});
