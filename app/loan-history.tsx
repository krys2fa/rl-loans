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

const loanHistory = [
  {
    id: "LN001",
    amount: "GHS 1000",
    status: "Paid",
    issued: "Jan 10, 2024",
    paid: "Mar 10, 2024",
  },
  {
    id: "LN002",
    amount: "GHS 500",
    status: "Ongoing",
    issued: "Feb 01, 2025",
    paid: "",
  },
  {
    id: "LN003",
    amount: "GHS 200",
    status: "Defaulted",
    issued: "Dec 15, 2023",
    paid: "-",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Paid":
      return <Ionicons name='checkmark-circle' size={24} color='#4caf50' />;
    case "Ongoing":
      return <Ionicons name='time-outline' size={24} color='#ff9800' />;
    case "Defaulted":
      return <Ionicons name='close-circle' size={24} color='#f44336' />;
    default:
      return null;
  }
};

export default function LoanHistoryScreen() {
  const [filter, setFilter] = useState("All");

  const filteredLoans =
    filter === "All"
      ? loanHistory
      : loanHistory.filter((loan) => loan.status === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loan History</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {["All", "Paid", "Ongoing", "Defaulted"].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setFilter(status)}
            style={[
              styles.filterButton,
              filter === status && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === status && styles.activeFilterText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredLoans}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.card}
          >
            <View style={styles.row}>
              {getStatusIcon(item.status)}
              <View style={styles.textContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.label}>
                  Issued: {item.issued}
                  {item.paid ? ` | Paid: ${item.paid}` : ""}
                </Text>
                <Text style={styles.loanId}>Loan ID: {item.id}</Text>
              </View>
            </View>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyState}>No loan history found.</Text>
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
    marginBottom: 10,
    fontFamily: "Inter",
    color: "#1e1e1e",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
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
  loanId: {
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
