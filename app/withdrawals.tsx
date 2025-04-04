import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const withdrawalsData = [
  {
    id: "WD001",
    amount: "GHS 200",
    method: "Mobile Money",
    date: "2025-04-01",
  },
  {
    id: "WD002",
    amount: "GHS 500",
    method: "Bank Transfer",
    date: "2025-03-15",
  },
  {
    id: "WD003",
    amount: "GHS 300",
    method: "Visa Card",
    date: "2025-02-20",
  },
];

const filterMethods = ["All", "Mobile Money", "Bank Transfer", "Visa Card"];

export default function WithdrawalsScreen() {
  const [selectedMethod, setSelectedMethod] = useState("All");

  const filteredWithdrawals = withdrawalsData.filter(
    (item) => selectedMethod === "All" || item.method === selectedMethod
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Withdrawals</Text>

      <View style={styles.filterContainer}>
        {filterMethods.map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.filterChip,
              selectedMethod === method && styles.activeFilter,
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Text
              style={[
                styles.filterText,
                selectedMethod === method && styles.activeFilterText,
              ]}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredWithdrawals}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.card}
          >
            <View style={styles.row}>
              <Ionicons name='wallet-outline' size={24} color='#1e88e5' />
              <View style={styles.textContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.label}>{item.method}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyState}>No withdrawals found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: "Inter",
    color: "#1e1e1e",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  filterChip: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#e0e0e0",
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: {
    color: "#555",
    fontSize: 14,
    fontFamily: "Quicksand",
  },
  activeFilter: {
    backgroundColor: "#1e88e5",
  },
  activeFilterText: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  emptyState: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 50,
  },
});
