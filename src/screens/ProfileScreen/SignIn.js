import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import Logo from "../../components/Logo/Logo";
import { doSetIsLogged } from "../../redux/isloggedIn/isloggedSlice";
import { doSetLoading } from "../../redux/spin/spinSlice";
import { doSetUser } from "../../redux/user/userSlice";
import { CallSignIn } from "../../services/UserAPI";
import { validateEmail, validatePassword } from "../../utils/validation";
import styles from "./Styles";

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleInputEmail = (text) => {
    setEmail(text);
    setErrorEmail(validateEmail(text));
  };

  const handleSignIn = async () => {
    handleInputEmail(email);
    handleInputPassword(password);

    if (email === "" || password === "") {
      return;
    }

    dispatch(doSetLoading(true));
    const response = await CallSignIn(email, password);
    console.log("Sign-in response:", response);
    dispatch(doSetLoading(false));
    if (response?.id) {
      // Save token to storage (e.g., AsyncStorage)
      await AsyncStorage.setItem("accessToken", response.accessToken);

      // Save user info to storage or state management
      await AsyncStorage.setItem("user", JSON.stringify(response));
      dispatch(doSetUser(response));
      dispatch(doSetIsLogged(true));
      Toast.show({
        type: "success",
        position: "top",
        text1: "Đăng nhập thành công!",
        visibilityTime: 2000,
        autoHide: true,
      });
      // Redirect to Home
      navigation.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đăng nhập thất bại!",
        text2: response.message,
        visibilityTime: 2000,
        autoHide: true,
        text2Style: { fontSize: 13 },
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputPassword = (text) => {
    setPassword(text);
    setErrorPassword(validatePassword(text));
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.containerSign]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.titleStyle]}>Đăng nhập</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Logo width={100} height={50} />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.inner}>
          <CustomInput
            placeholder={"Email"}
            icon={"mail"}
            onChangeText={(text) => handleInputEmail(text)}
            value={email}
            error={errorEmail}
          />
          <CustomInput
            placeholder={"Mật khẩu"}
            icon={"lock"}
            secureTextEntry={showPassword}
            onChangeText={(text) => handleInputPassword(text)}
            value={password}
            error={errorPassword}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
          />
          {/* <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => handleFogetPassword()}>
              <Text style={styles.forgetPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => handleSignIn()}>
              <Text style={styles.textBtn}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
