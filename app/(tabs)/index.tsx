import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const transactions = [
  {
    label: "Credit Worthiness Check",
    icon: "pulse-outline",
    route: "../credit-check",
  },
  {
    label: "Loan History",
    icon: "document-text-outline",
    route: "../loan-history",
  },
  {
    label: "Payment Schedule",
    icon: "calendar-outline",
    route: "../payment-schedule",
  },
  { label: "Payments", icon: "cash-outline", route: "../payments" },
  { label: "Withdrawals", icon: "wallet-outline", route: "../withdrawals" },
  { label: "Customer Support", icon: "headset-outline", route: "../support" },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/rl-logo.png")}
          style={styles.logo}
        />
        <Ionicons
          name='notifications-outline'
          size={24}
          style={styles.notificationIcon}
        />
      </View>

      <View style={styles.info}>
        <Ionicons name='card' size={120} color='#e6e5e8' />
        <View>
          <Text style={styles.infoText}>Current Loan</Text>
          <Text style={styles.infoText}>GHS 0</Text>
          <Text style={styles.infoLabel}>Next payment due</Text>
          <Text style={styles.infoDesc}>No upcoming payments</Text>
        </View>
      </View>

      <View style={styles.tiles}>
        <View style={styles.tilesItem}>
          <Text>Outstanding Balance</Text>
          <Text style={styles.tileText}>GHS 0</Text>
        </View>
        <View style={styles.tilesItem}>
          <Text>Loan Limit Available</Text>
          <Text style={styles.tileText}>GHS 5, 000</Text>
        </View>
        <View style={styles.tilesItem}>
          <Text>Credit Score</Text>
          <Text style={styles.tileText}>42</Text>
        </View>
      </View>

      <Text style={styles.heading}>Transactions</Text>

      <View style={styles.itemsContainer}>
        {transactions.map((item, index) => (
          <Link key={index} href={item.route} asChild>
            <TouchableOpacity style={styles.item}>
              <Ionicons name={item.icon} size={20} />
              <Text style={styles.itemsText}>{item.label}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  notificationIcon: {
    color: "#1e88e5",
  },
  info: {
    flexDirection: "row",
    backgroundColor: "#1e88e5",
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  infoText: {
    color: "#fafafa",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    fontFamily: "Inter",
  },
  infoLabel: {
    color: "#fafafa",
    fontSize: 15,
    padding: 5,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  infoDesc: {
    color: "#fafafa",
    fontSize: 14,
    padding: 5,
    fontFamily: "Quicksand",
  },
  tiles: {
    flexWrap: "wrap",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  tilesItem: {
    justifyContent: "center",
    backgroundColor: "#e6e5e8",
    padding: 10,
    borderRadius: 15,
  },
  tileText: {
    margin: "auto",
    padding: 10,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "#00060c",
    fontFamily: "Inter",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    alignItems: "center",
    width: "45%",
    padding: 20,
    margin: 5,
    backgroundColor: "#e6e5e8",
    borderRadius: 10,
  },
  itemsText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00060c",
    marginLeft: 10,
    padding: 10,
    fontFamily: "Quicksand",
  },
});
