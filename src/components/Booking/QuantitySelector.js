import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../screens/Booking/Styles";
import { COLORS } from "../../theme/theme";

const QuantitySelector = ({ quantity, decreaseQuantity, increaseQuantity }) => {
  return (
    <>
      <TouchableOpacity
        disabled={quantity === 0}
        style={[
          styles.btnQuantity,
          { marginRight: 10, opacity: quantity === 0 ? 0.5 : 1 },
        ]}
        onPress={decreaseQuantity}
      >
        <MaterialIcons name="remove" size={24} color={COLORS.Orange} />
      </TouchableOpacity>
      <Text>{quantity}</Text>
      <TouchableOpacity
        style={[styles.btnQuantity, { marginLeft: 10 }]}
        onPress={increaseQuantity}
      >
        <MaterialIcons name="add" size={24} color={COLORS.Orange} />
      </TouchableOpacity>
    </>
  );
};

export default QuantitySelector;
