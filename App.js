import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigators/TabNavigator";
import MovieDetail from "./screens/MovieDetail";
import ShowTime from "./screens/ShowTime";
const Stack = createNativeStackNavigator();

import Logo from "./screens/Logo";
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: "default" }}
        />
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
        <Stack.Screen name="ShowTime" component={ShowTime} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
