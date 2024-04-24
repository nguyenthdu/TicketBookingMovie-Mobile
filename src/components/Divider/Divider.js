import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../theme/theme";

const Divider = ({ bdWidth, bdColor, lineWidth }) => {
  return (
    <View
      style={{
        borderBottomWidth: bdWidth || 1,
        borderBottomColor: bdColor || COLORS.Grey,
        marginHorizontal: lineWidth || 16,
        marginTop: 10,
      }}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({});
