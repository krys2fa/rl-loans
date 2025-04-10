import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FaceDetector from "expo-face-detector";
import { useRouter } from "expo-router";

export default function Selfie() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [faces, setFaces] = useState<FaceDetector.Face[] | null>(null);
  const router = useRouter(); // Router instance to navigate to the next screen

  // Request camera permissions and initialize camera
  React.useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermissions();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      detectFaces(result.uri); // Call detectFaces after capturing the image
    }
  };

  const detectFaces = async (uri: string) => {
    try {
      // Call the face detector on the captured image
      const { faces } = await FaceDetector.detectFacesAsync(uri, {
        mode: FaceDetector.Constants.Mode.fast,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.all,
      });

      if (faces.length > 0) {
        setFaces(faces);
        console.log("Faces detected: ", faces);
      } else {
        setFaces(null);
        Alert.alert("No faces detected", "No faces detected in the image.");
      }

      // Navigate to the next screen after capturing the image (whether faces are detected or not)
      router.push("/onboarding/id-front");
    } catch (error) {
      console.error("Error detecting faces: ", error);
      Alert.alert("Error", "There was an issue detecting faces.");
      // Navigate to the next screen if there was an error or no faces detected
      router.push("/onboarding/id-front");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Take a Selfie</Text>
      <Text style={styles.subtitle}>
        Please capture your selfie for verification
      </Text>

      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ) : (
        <Text style={styles.noImageText}>No image captured yet</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Capture Selfie</Text>
        <Ionicons name='camera' size={24} color='#fff' />
      </TouchableOpacity>

      {faces && faces.length > 0 && (
        <View style={styles.facesContainer}>
          <Text style={styles.faceText}>Faces Detected: {faces.length}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  noImageText: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
    width: 220,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  facesContainer: {
    marginTop: 20,
  },
  faceText: {
    fontSize: 16,
    color: "#4a90e2",
  },
});
