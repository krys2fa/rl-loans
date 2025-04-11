import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const transactions = [
  {
    label: "Creditworthiness",
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
  useProtectedRoute();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/signin");
    } catch (error: any) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/rl-logo.png")}
            style={styles.logo}
          />
          <Pressable onPress={handleLogout}>
            <Ionicons
              name='exit-outline'
              size={24}
              style={styles.notificationIcon}
            />
          </Pressable>
        </View>

        <View style={styles.info}>
          <Ionicons name='card' size={100} color='#e6e5e8' />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoText}>Current Loan</Text>
            <Text style={styles.infoText}>GHS 0</Text>
            <Text style={styles.infoLabel}>Next payment due</Text>
            <Text style={styles.infoDesc}>No upcoming payments</Text>
          </View>
        </View>

        <View style={styles.tiles}>
          <View style={styles.tilesItem}>
            <Text style={styles.tileTitle}>Outstanding Balance</Text>
            <Text style={styles.tileText}>GHS 0</Text>
          </View>
          <View style={styles.tilesItem}>
            <Text style={styles.tileTitle}>Loan Limit Available</Text>
            <Text style={styles.tileText}>GHS 5,000</Text>
          </View>
          <View style={styles.tilesItem}>
            <Text style={styles.tileTitle}>Credit Score</Text>
            <Text style={styles.tileText}>42</Text>
          </View>
        </View>

        <Text style={styles.heading}>Transactions</Text>

        <View style={styles.itemsContainer}>
          {transactions.map((item, index) => (
            <Link key={index} href={item.route} asChild>
              <TouchableOpacity style={styles.item}>
                <Ionicons name={item.icon} size={24} color='#1e88e5' />
                <Text style={styles.itemsText}>{item.label}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  scrollContainer: {
    paddingBottom: 20,
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
    padding: 15,
    margin: 10,
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    color: "#fafafa",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  infoLabel: {
    color: "#fafafa",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  infoDesc: {
    color: "#fafafa",
    fontSize: 14,
    fontFamily: "Quicksand",
  },
  tiles: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 10,
  },
  tilesItem: {
    backgroundColor: "#e6e5e8",
    padding: 15,
    borderRadius: 15,
    width: "30%",
    alignItems: "center",
  },
  tileTitle: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "Quicksand",
  },
  tileText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#000",
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
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: "#e6e5e8",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    width: "47%",
    alignItems: "center",
  },
  itemsText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#00060c",
    paddingTop: 10,
    fontFamily: "Quicksand",
  },
});
