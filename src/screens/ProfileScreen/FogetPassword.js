import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FONTSIZE } from "../../theme/theme";
import styles from "./Styles";

const FogetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const regexes = {
    email: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|icloud)\.com$/,
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

  const handleForgetPassword = () => {
    if (email === "") {
      setErrorEmail("Email không được để trống");
    } else if (!regexes.email.test(email)) {
      setErrorEmail("Email không hợp lệ");
    } else {
      // Gọi API quên mật khẩu ở đây
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.containerSign]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.titleStyle]}>Quên mật khẩu</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.inner, { marginTop: 50 }]}>
            <Text
              style={[
                styles.textForgetPassword,
                { fontSize: FONTSIZE.size_20, fontWeight: "400" },
              ]}
            >
              Quên mật khẩu?
            </Text>
            <Text style={[styles.textForgetPassword, { marginVertical: 10 }]}>
              Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi link kích hoạt
              cho bạn.
            </Text>
            <CustomInput
              placeholder={"Email"}
              icon={"mail"}
              onChangeText={(text) => handleInputEmail(text)}
              value={email}
              error={errorEmail}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleForgetPassword()}
              >
                <Text style={styles.textBtn}>Cấp lại mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FogetPassword;
