import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home"; // Thay đổi icon tương ứng
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search"; // Thay đổi icon tương ứng
          } else if (route.name === "Profile") {
            iconName = focused ? "account-circle" : "account-circle"; // Thay đổi icon tương ứng
          }

          return (
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,

                  backgroundColor: focused ? COLORS.Orange : "transparent", // Màu cam khi được chọn
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name={iconName}
                  size={size}
                  color={focused ? "white" : color}
                />
              </View>
              {focused ? (
                <Text style={{ color: "white", fontSize: 16 }}>
                  {route.name}
                </Text>
              ) : null}
            </View>
          );
        },
        tabBarActiveTintColor: "#FF5524",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom: 15,
        },
        tabBarStyle: {
          height: 60,
          display: "flex",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Trang chủ" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: "Tìm kiếm" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Tài khoản" }}
      />
    </Tab.Navigator>
  );
}
