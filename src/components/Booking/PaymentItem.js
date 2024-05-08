import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";

const PaymentItem = ({ title }) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          resizeMode: "contain",
        }}
        source={require("../../assets/images/logo-VNPAY.png")}
      />
      <Text
        style={{
          fontSize: FONTSIZE.size_16,
          flexWrap: "wrap",
          marginLeft: 10,
          width: width * 0.6,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          width: width * 0.2,
          marginRight: 10,
          display: "flex",
          alignItems: "flex-end",
          paddingRight: 10,
        }}
      >
        <MaterialIcons name="check-circle" size={35} color={COLORS.Orange} />
      </View>
    </View>
  );
};

export default PaymentItem;
