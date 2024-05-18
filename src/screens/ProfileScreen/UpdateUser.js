import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDateInput from "../../components/CustomInput/DateInput";
import RadioButton from "../../components/CustomInput/RadioButton";
import { doSetUser } from "../../redux/user/userSlice";
import { CallGetUserById, CallUpdateUser } from "../../services/UserAPI";
import { COLORS } from "../../theme/theme";
import {
  validateEmail,
  validatePhoneNumber,
  validateUserName,
} from "../../utils/validation";
import styles from "./Styles";

const UpdateUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // set vào các state thông tin cá nhân của user
    setUserName(user?.username);
    setEmail(user?.email);
    setPhoneNumber(user?.phone);
    setGender(user?.gender ? "Nam" : "Nữ");
    setDateOfBirth(user?.birthday ? new Date(user?.birthday) : null);
  }, []);

  const [gender, setGender] = useState("Nam");
  const [userName, setUserName] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [errorDateOfBirth, setErrorDateOfBirth] = useState("");

  // useEffect(() => {
  //   console.log("dateOfBirth", moment.dateOfBirth);
  // }, [dateOfBirth]);

  const handleSelectGender = (option) => {
    setGender(option);
  };

  const handleInputUserName = (text) => {
    setUserName(text);
    setErrorUserName(validateUserName(text));
  };

  const handleInputPhoneNumber = (text) => {
    setPhoneNumber(text);
    setErrorPhoneNumber(validatePhoneNumber(text));
  };

  const handleInputEmail = (text) => {
    setEmail(text);
    setErrorEmail(validateEmail(text));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    const resUpdateUser = await CallUpdateUser(
      user.id,
      userName,
      phoneNumber,
      gender,
      dateOfBirth
    );
    console.log("resUpdateUser", resUpdateUser);
    if (resUpdateUser?.status === 200) {
      // ghi lại các giá trị vào redux từ state
      const resUser = await CallGetUserById(user.id);
      console.log("resUser", resUser);
      if (resUser) {
        dispatch(doSetUser(resUser));
      }

      Toast.show({
        type: "success",
        position: "top",
        text1: "Cập nhật thành công",
        visibilityTime: 2000,
        autoHide: true,
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Cập nhật thất bại",
        text2: resUpdateUser?.message,
        visibilityTime: 2000,
        autoHide: true,
        text2Style: { fontSize: 13 },
      });
    }
  };

  const isFormChanged = () => {
    const initialGender = user?.gender ? "Nam" : "Nữ";
    const initialDateOfBirth = user?.birthday ? new Date(user.birthday) : null;

    return (
      userName !== user?.username ||
      phoneNumber !== user?.phone ||
      gender !== initialGender ||
      (dateOfBirth &&
        initialDateOfBirth &&
        dateOfBirth.toISOString() !== initialDateOfBirth.toISOString())
    );
  };

  useEffect(() => {
    isFormChanged();
  }, [userName, phoneNumber, gender, dateOfBirth]);

  return (
    <SafeAreaView style={[styles.wrapper, styles.containerSign]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.titleStyle]}>Thông tin cá nhân</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <KeyboardAwareScrollView>
          <View style={styles.userInfoUpdate}>
            <Image
              source={require("../../assets/images/avatarDefault.png")}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{user?.username}</Text>
          </View>
          <View style={styles.innerUpdate}>
            <CustomInput
              placeholder={"Họ và tên"}
              icon={"user"}
              onChangeText={(text) => handleInputUserName(text)}
              value={userName}
              error={errorUserName}
            />
            <CustomInput
              editable={false}
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
            <View style={[styles.btnContainer, { marginBottom: 30 }]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: !isFormChanged()
                      ? COLORS.DarkGrey
                      : COLORS.Orange,
                  },
                ]}
                onPress={() => handleSubmit()}
                disabled={!isFormChanged()}
              >
                <Text style={styles.textBtn}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
