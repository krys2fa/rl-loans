import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight } from "react-native-reanimated";

const schedule = [
  {
    id: "1",
    date: "2025-04-05",
    amount: "GHS 400.00",
    status: "Paid",
    method: "Bank Transfer",
  },
  {
    id: "2",
    date: "2025-05-05",
    amount: "GHS 400.00",
    status: "Due",
    method: "Mobile Money",
  },
  {
    id: "3",
    date: "2025-06-05",
    amount: "GHS 400.00",
    status: "Pending",
    method: "Bank Transfer",
  },
  {
    id: "4",
    date: "2025-07-05",
    amount: "GHS 400.00",
    status: "Upcoming",
    method: "Mobile Money",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "#4caf50";
    case "Due":
      return "#ff9800";
    case "Pending":
      return "#f44336";
    case "Upcoming":
    default:
      return "#2196f3";
  }
};

export default function PaymentScheduleScreen() {
  const [filter, setFilter] = useState("All");

  const filteredSchedule =
    filter === "All"
      ? schedule
      : schedule.filter((item) => item.status === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Schedule</Text>

      {/* Filter UI */}
      <View style={styles.filterContainer}>
        {["All", "Paid", "Due", "Pending", "Upcoming"].map((status) => (
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
        data={filteredSchedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInRight.delay(index * 100)}
            style={[
              styles.card,
              { borderLeftColor: getStatusColor(item.status) },
            ]}
          >
            <View style={styles.row}>
              <Ionicons name='calendar-outline' size={20} color='#888' />
              <Text style={styles.label}>{item.date}</Text>
            </View>

            <Text style={styles.amount}>{item.amount}</Text>

            <View style={styles.row}>
              <Ionicons name='cash-outline' size={20} color='#888' />
              <Text style={styles.label}>{item.method}</Text>
            </View>

            <View style={styles.statusContainer}>
              <Ionicons
                name={
                  item.status === "Paid"
                    ? "checkmark-circle"
                    : item.status === "Due"
                    ? "alert-circle"
                    : item.status === "Pending"
                    ? "time"
                    : "calendar"
                }
                size={18}
                color={getStatusColor(item.status)}
              />
              <Text
                style={[styles.status, { color: getStatusColor(item.status) }]}
              >
                {item.status}
              </Text>
            </View>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyState}>No scheduled payments found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd", padding: 16 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: "#222",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  status: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 50,
  },
});
