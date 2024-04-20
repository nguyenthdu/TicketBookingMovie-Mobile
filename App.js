import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";
import BookSeat from "./src/screens/BookSeat";
import Food from "./src/screens/Food";
import MovieDetail from "./src/screens/MovieDetail";
import MoviesShowing from "./src/screens/MoviesShowing";
import MoviesUpcoming from "./src/screens/MoviesUpcoming";
import ReviewSummary from "./src/screens/ReviewSummary";
import ShowTime from "./src/screens/ShowTime";
const Stack = createNativeStackNavigator();

import Logo from "./src/screens/Logo";
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
