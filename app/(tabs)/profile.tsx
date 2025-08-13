import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const getCreditIcon = (score: number) => {
  if (score >= 50)
    return {
      name: "shield-checkmark-outline",
      color: "#4caf50",
      label: "Excellent",
    };
  if (score >= 40)
    return { name: "shield-outline", color: "#1e88e5", label: "Good" };
  if (score >= 20)
    return { name: "shield-half-outline", color: "#ffc107", label: "Fair" };
  return { name: "shield-close-outline", color: "#f44336", label: "Poor" };
};

export default function SettingsScreen() {
  const profile = useSelector((state: RootState) => state.profile);
  const { name, color, label } = getCreditIcon(profile.creditScore);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Profile</Text>

      <View style={styles.profileSection}>
        <MaterialIcons name="account-circle" size={80} color="#1e88e5" />
        <Text style={styles.name}>{profile.name}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          editable={false}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={profile.phone}
          editable={false}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={profile.address}
          editable={false}
        />

        <Text style={styles.label}>Occupation</Text>
        <TextInput
          style={styles.input}
          value={profile.occupation}
          editable={false}
        />

        <Text style={styles.label}>Credit Score</Text>
        <TextInput
          style={styles.input}
          value={`${profile.creditScore}`}
          editable={false}
        />

        <Text style={styles.label}>Creditworthiness</Text>
        <View style={styles.creditContainer}>
          <Ionicons
            name={name}
            size={40}
            color={color}
            style={styles.creditIcon}
          />
          <Text style={[styles.creditText, { color }]}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Quicksand",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e88e5",
    marginTop: 10,
    fontFamily: "Quicksand",
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Quicksand",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  creditContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  creditIcon: {
    marginRight: 10,
  },
  creditText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
});
