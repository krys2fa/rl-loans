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

const payments = [
  {
    id: "PMT001",
    amount: "GHS 300",
    method: "Mobile Money",
    date: "Mar 01, 2025",
  },
  {
    id: "PMT002",
    amount: "GHS 150",
    method: "Visa Card",
    date: "Feb 10, 2025",
  },
  {
    id: "PMT003",
    amount: "GHS 500",
    method: "Bank Transfer",
    date: "Jan 20, 2025",
  },
];

export default function PaymentsScreen() {
  const [filter, setFilter] = useState("All");

  const filteredPayments =
    filter === "All"
      ? payments
      : payments.filter((item) => item.method === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payments</Text>

      {/* Filter UI */}
      <View style={styles.filterContainer}>
        {["All", "Mobile Money", "Visa Card", "Bank Transfer"].map((method) => (
          <TouchableOpacity
            key={method}
            onPress={() => setFilter(method)}
            style={[
              styles.filterButton,
              filter === method && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === method && styles.activeFilterText,
              ]}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredPayments}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.card}
          >
            <View style={styles.row}>
              <Ionicons name='cash-outline' size={24} color='#1e88e5' />
              <View style={styles.textContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.label}>{item.method}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyState}>
            No payments found for this method.
          </Text>
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
  filterButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  activeFilter: {
    backgroundColor: "#1e88e5",
  },
  filterText: {
    color: "#555",
    fontSize: 14,
    fontFamily: "Quicksand",
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
