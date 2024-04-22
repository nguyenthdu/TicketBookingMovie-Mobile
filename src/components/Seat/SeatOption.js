import React from "react";
import { Text, View } from "react-native";

const SeatOption = ({ type, color, label }) => {
  return (
    <View style={styles.rowContainer}>
      <View
        style={[
          type === "bd" ? styles.borderStyle : styles.backgroundStyle,
          {
            borderColor: type === "bd" ? color : "transparent",
            backgroundColor: type === "bgc" ? color : "transparent",
          },
        ]}
      />
      <Text>{label}</Text>
    </View>
  );
};

const styles = {
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  borderStyle: {
    borderWidth: 1.5,
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  backgroundStyle: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
};

export default SeatOption;
