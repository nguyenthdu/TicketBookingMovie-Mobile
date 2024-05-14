import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../../theme/theme";

const CustomInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  icon,
  onChangeText,
  value,
  error,
  handleShowPassword,
  showPassword,
  editable = true,
}) => {
  const handleChangeText = (text) => {
    onChangeText(text);
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          !editable && { backgroundColor: COLORS.DarkGrey },
        ]}
      >
        <AntDesign
          name={icon}
          size={24}
          color={COLORS.Black}
          style={styles.icon}
        />
        <TextInput
          editable={editable}
          style={[styles.input]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.DarkGrey}
          onChangeText={handleChangeText}
          value={value}
          keyboardType={keyboardType || "default"}
          secureTextEntry={secureTextEntry || false}
        />
        {handleShowPassword && (
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={handleShowPassword}
          />
        )}
      </View>
      <View>{error ? <Text style={styles.error}>{error}</Text> : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.DarkGrey,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: COLORS.Black,
    marginLeft: 8,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 8,
  },
});

export default CustomInput;
