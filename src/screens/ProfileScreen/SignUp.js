import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./Styles";

const SignUp = () => {
  return (
    <SafeAreaView
      style={[styles.container, { justifyContent: "center", padding: 10 }]}
    >
      <CustomInput
        placeholder="Nhập text"
        keyboardType="default"
        secureTextEntry={false}
      />
    </SafeAreaView>
  );
};

export default SignUp;
