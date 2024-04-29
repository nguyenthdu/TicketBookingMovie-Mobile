import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../theme/theme";

const Divider = ({
  bdWidth,
  bdColor,
  lineWidth,
  marginTop,
  marginBottom,
  borderStyle,
  zIndex,
}) => {
  return (
    <View
      style={{
        zIndex: zIndex || null,
        borderBottomWidth: bdWidth || 1,
        borderBottomColor: bdColor || COLORS.Grey,
        marginHorizontal: lineWidth || 16,
        marginTop: marginTop || 10,
        marginBottom: marginBottom || 0,
        borderStyle: borderStyle || "solid",
      }}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({});
