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

  // hiện ra các thông báo lỗi tương ứng với từng regex của mỗi trường
  // regex không được để trống cho toàn bộ các trường
  // regex cho userName: chỉ chứa ký tự chữ cái và khoảng trắng, tối thiểu 2 ký tự
  // regex cho gmail của google: không chứa khoảng trắng, có ký tự @, phía sau là @gmail.com, hoặc @yahoo.com, hoặc @outlook.com, hoặc @icloud.com
  // regex cho số điện thoại: chỉ chứa số, độ dài 10 ký tự, bắt đầu là: 032, 033, 034, 035, 036, 037, 038, 039, 070, 079, 077, 076, 078, 083, 084, 085, 081, 082, 088, 091, 094, 096, 098, 092, 056, 058, 099, 059, còn lại 8 số
  // regex cho ngày tháng năm sinh: có dạng dd/mm/yyyy, ví dụ: 01/01/2000
  // regex cho mật khẩu: chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, và ký đặt biệt
  // regex cho nhập lại mật khẩu: giống với mật khẩu

  const regexes = {
    userName: /^[a-zA-Z ]{2,}$/,
    email: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|icloud)\.com$/,
    phoneNumber:
      /^(03[2-9]|07[0-9]|08[1-9]|09[1|2|4|6|8|2|6|8]|05[6|8|9]|059|099)\d{7}$/,
    // dateOfBirth: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const handleInputUserName = (text) => {
    setUserName(text);
    if (!text.trim()) {
      setErrorUserName("Tên không được để trống");
    } else if (text.length < 2) {
      setErrorUserName("Tên cần ít nhất 2 ký tự");
    } else if (!/^[a-zA-Z ]+$/.test(text)) {
      setErrorUserName("Tên chỉ được chứa ký tự chữ cái và khoảng trắng");
    } else {
      setErrorUserName("");
    }
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

  const handleInputPhoneNumber = (text) => {
    setPhoneNumber(text);
    if (!regexes.phoneNumber.test(text)) {
      setErrorPhoneNumber("Số điện thoại không hợp lệ");
    } else if (text === "") {
      setErrorPhoneNumber("Số điện thoại không được để trống");
    } else {
      setErrorPhoneNumber("");
    }
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
        visibilityTime: 2000,
      });
      navigation.navigate("SignIn");
    } else {
      dispatch(doSetLoading(false));
      console.error("error SignUp: ", resSignUp);
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
