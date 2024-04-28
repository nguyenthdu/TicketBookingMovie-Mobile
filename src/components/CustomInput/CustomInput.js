import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Hoshi } from "react-native-textinput-effects";

const CustomInput = ({ placeholder, keyboardType, secureTextEntry }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Hoshi
      label={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      borderColor={isFocused ? "#007bff" : "#000"} // Màu sắc khi trường nhập liệu được tập trung
      labelStyle={styles.label} // Style cho label
      inputStyle={styles.input} // Style cho input
      keyboardType={keyboardType} // Kiểu bàn phím
      secureTextEntry={secureTextEntry} // Định dạng mật khẩu
    />
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#007bff", // Màu sắc của label
  },
  input: {
    color: "#000", // Màu sắc của input text
  },
});

export default CustomInput;
