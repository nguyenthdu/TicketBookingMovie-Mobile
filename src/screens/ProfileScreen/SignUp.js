import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDateInput from "../../components/CustomInput/DateInput";
import RadioButton from "../../components/CustomInput/RadioButton";
import Logo from "../../components/Logo/Logo";
import { doSetLoading } from "../../redux/spin/spinSlice";
import { CallSignUp } from "../../services/UserAPI";
import { dateFormatYYMMDD } from "../../utils/formatData";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUserName,
} from "../../utils/validation";
import styles from "./Styles";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const [gender, setGender] = useState("Nam");
  const [userName, setUserName] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [errorDateOfBirth, setErrorDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputUserName = (text) => {
    setUserName(text);
    setErrorUserName(validateUserName(text));
  };

  const handleInputEmail = (text) => {
    setEmail(text);
    setErrorEmail(validateEmail(text));
  };

  const handleInputPhoneNumber = (text) => {
    setPhoneNumber(text);
    setErrorPhoneNumber(validatePhoneNumber(text));
  };

  const handleInputPassword = (text) => {
    setPassword(text);
    setErrorPassword(validatePassword(text));
  };

  const handleSelectGender = (option) => {
    setGender(option);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (
      !userName ||
      !email ||
      !phoneNumber ||
      !dateOfBirth ||
      !password ||
      errorUserName ||
      errorEmail ||
      errorPhoneNumber ||
      errorDateOfBirth ||
      errorPassword
    ) {
      if (!userName) {
        setErrorUserName("Tên không được để trống");
        return;
      }
      if (!email) {
        setErrorEmail("Email không được để trống");
        return;
      }
      if (!phoneNumber) {
        setErrorPhoneNumber("Số điện thoại không được để trống");
        return;
      }
      if (!dateOfBirth) {
        setErrorDateOfBirth("Ngày sinh không được để trống");
        return;
      }
      if (!password) {
        setErrorPassword("Mật khẩu không được để trống");
        return;
      }
      return;
    }

    const birthday = dateFormatYYMMDD(dateOfBirth);
    console.log("birthday: ", birthday);
    // return;

    dispatch(doSetLoading(true));
    const resSignUp = await CallSignUp(
      userName,
      email,
      gender,
      birthday,
      phoneNumber,
      password
    );
    console.log("resSignUp: ", resSignUp);
    if (resSignUp?.status === 200) {
      dispatch(doSetLoading(false));
      Toast.show({
        type: "success",
        text1: "Đăng ký thành công",
        text2: "Vui lòng vào gmail để xác thực!",
        visibilityTime: 2000,
        text1Style: { flexWrap: "wrap" },
        text2Style: { flexWrap: "wrap", fontSize: 13 },
      });
      navigation.navigate("SignIn");
    } else {
      dispatch(doSetLoading(false));
      console.log("error SignUp: ", resSignUp);
      Toast.show({
        type: "error",
        text1: `${resSignUp?.message || "Đăng ký thất bại"}`,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.containerSign]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.titleStyle]}>Đăng ký</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Logo width={100} height={50} />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.inner}>
          <CustomInput
            placeholder={"Họ và tên"}
            icon={"user"}
            onChangeText={(text) => handleInputUserName(text)}
            value={userName}
            error={errorUserName}
          />
          <CustomInput
            placeholder={"Email"}
            icon={"mail"}
            onChangeText={(text) => handleInputEmail(text)}
            value={email}
            error={errorEmail}
          />
          <CustomInput
            placeholder={"Nhập số điện thoại"}
            keyboardType={"phone-pad"}
            icon={"phone"}
            onChangeText={(text) => handleInputPhoneNumber(text)}
            value={phoneNumber}
            error={errorPhoneNumber}
          />
          <RadioButton
            options={["Nam", "Nữ"]}
            selectedOption={gender}
            onSelect={handleSelectGender}
          />
          <CustomDateInput
            placeholder={"Ngày sinh"}
            date={dateOfBirth}
            onChange={setDateOfBirth}
            error={errorDateOfBirth}
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
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
              <Text style={styles.textBtn}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
