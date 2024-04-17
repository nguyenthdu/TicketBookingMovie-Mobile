import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigators/TabNavigator";
import MovieDetail from "./screens/MovieDetail";
import ShowTime from "./screens/ShowTime";
import MoviesShowing from "./screens/MoviesShowing";
import MoviesUpcoming from "./screens/MoviesUpcoming";
import BookSeat from "./screens/BookSeat";
import Food from "./screens/Food";
import ReviewSummary from "./screens/ReviewSummary";
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
        <Stack.Screen name="MoviesShowing" component={MoviesShowing} />
        <Stack.Screen name="MoviesUpcoming" component={MoviesUpcoming} />
        <Stack.Screen name="BookSeat" component={BookSeat} />
        <Stack.Screen name="Food" component={Food} />
        <Stack.Screen name="ReviewSummary" component={ReviewSummary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
