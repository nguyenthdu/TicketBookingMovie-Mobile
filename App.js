import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import Spinner from "./src/components/Spin/Spin";
import TabNavigator from "./src/navigators/TabNavigator";
import { store } from "./src/redux/store";
import Food from "./src/screens/Booking/BookFood";
import BookSeat from "./src/screens/Booking/BookSeat";
import Payment from "./src/screens/Booking/Payment";
import ShowTime from "./src/screens/Booking/ShowTime";
import MovieDetail from "./src/screens/MovieScreen/MovieDetail";
import MoviesShowing from "./src/screens/MoviesShowing";
import MoviesUpcoming from "./src/screens/MoviesUpcoming";
import SignIn from "./src/screens/ProfileScreen/SignIn";
import SignUp from "./src/screens/ProfileScreen/SignUp";

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
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      <Spinner />
    </Provider>
  );
}
export default App;
