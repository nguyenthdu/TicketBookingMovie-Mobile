import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Provider, useDispatch } from "react-redux";
import Spinner from "./src/components/Spin/Spin";
import TabNavigator from "./src/navigators/TabNavigator";
import { doSetIsLogged } from "./src/redux/isloggedIn/isloggedSlice";
import { store } from "./src/redux/store";
import Food from "./src/screens/Booking/BookFood";
import BookSeat from "./src/screens/Booking/BookSeat";
import Payment from "./src/screens/Booking/Payment";
import ShowTime from "./src/screens/Booking/ShowTime";
import VnPay from "./src/screens/Booking/VnPay";
import VnPayVerify from "./src/screens/Booking/VnPayVerify";
import MovieDetail from "./src/screens/MovieScreen/MovieDetail";
import MoviesShowing from "./src/screens/MoviesShowing";
import MoviesUpcoming from "./src/screens/MoviesUpcoming";
import ForgetPassword from "./src/screens/ProfileScreen/FogetPassword";
import SignIn from "./src/screens/ProfileScreen/SignIn";
import SignUp from "./src/screens/ProfileScreen/SignUp";
import { checkUserDataInAsyncStorage } from "./src/utils/AsyncStorage";

const Stack = createNativeStackNavigator();

// import Logo from "./src/screens/Logo";

const AppNavigator = () => {
  const dispatch = useDispatch();
  // const isLogged = useSelector((state) => state.isLogged.isLogged);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const userData = await checkUserDataInAsyncStorage();
    if (userData !== null) {
      const { user, accessToken } = userData;
      console.log("data user:", user, accessToken);
      dispatch(doSetIsLogged(true));
    } else {
      dispatch(doSetIsLogged(false));
      console.log("not found");
    }
  };

  return (
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
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="VnPay" component={VnPay} />
        <Stack.Screen name="VerifyPayment" component={VnPayVerify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
      <Spinner />
    </Provider>
  );
}
export default App;
