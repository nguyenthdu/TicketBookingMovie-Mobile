import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput/CustomInput";
import Logo from "../../components/Logo/Logo";
import styles from "./Styles";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleSignIn = async () => {
    // Gọi API đăng nhập ở đây
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const regexes = {
    userName: /^[a-zA-Z ]{2,}$/,
    email: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|icloud)\.com$/,
    phoneNumber:
      /^(03[2-9]|07[0-9]|08[1-9]|09[1|2|4|6|8|2|6|8]|05[6|8|9]|059|099)\d{7}$/,
    // dateOfBirth: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const handleInputEmail = (text) => {
    setEmail(text);
    if (text === "") {
      setErrorEmail("Email không được để trống");
    } else if (!regexes.email.test(text)) {
      setErrorEmail("Email không hợp lệ");
    } else {
      setErrorEmail("");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputPassword = (text) => {
    setPassword(text);
    if (text === "") {
      setErrorPassword("Mật khẩu không được để trống");
    } else if (!regexes.password.test(text)) {
      setErrorPassword("Mật khẩu không hợp lệ");
    } else {
      setErrorPassword("");
    }
  };

  const handleFogetPassword = () => {
    navigation.navigate("ForgetPassword");
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
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => handleFogetPassword()}>
              <Text style={styles.forgetPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
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
