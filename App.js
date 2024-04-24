import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import TabNavigator from "./src/navigators/TabNavigator";
import { store } from "./src/redux/store";
import Food from "./src/screens/Booking/BookFood";
import BookSeat from "./src/screens/Booking/BookSeat";
import ShowTime from "./src/screens/Booking/ShowTime";
import MovieDetail from "./src/screens/MovieScreen/MovieDetail";
import MoviesShowing from "./src/screens/MoviesShowing";
import MoviesUpcoming from "./src/screens/MoviesUpcoming";
import ReviewSummary from "./src/screens/ReviewSummary";
const Stack = createNativeStackNavigator();

// import Logo from "./src/screens/Logo";
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{ animation: "default" }}
          />
          {/* <Stack.Screen name="Logo" component={Logo} /> */}
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
          <Stack.Screen name="ShowTime" component={ShowTime} />
          <Stack.Screen name="MoviesShowing" component={MoviesShowing} />
          <Stack.Screen name="MoviesUpcoming" component={MoviesUpcoming} />
          <Stack.Screen name="BookSeat" component={BookSeat} />
          <Stack.Screen name="Food" component={Food} />
          <Stack.Screen name="ReviewSummary" component={ReviewSummary} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
