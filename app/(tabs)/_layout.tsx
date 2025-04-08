import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (!user) {
    return <Redirect href='/signin' />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#00060c",
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "easel-sharp" : "easel-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='apply'
        options={{
          title: "Apply",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                // focused ? "information-circle" : "information-circle-outline"
                focused ? "id-card-sharp" : "id-card-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='pay'
        options={{
          title: "Pay Loan",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "document" : "document-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name='withdraw'
        options={{
          title: "Withdraw",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "wallet-sharp" : "wallet-sharp"}
              color={color}
              size={24}
            />
          ),
        }}
      /> */}

      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
