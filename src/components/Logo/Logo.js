import React from "react";
import { Image } from "react-native";

export default function Logo({ width, height }) {
  return (
    <Image
      source={require("../../assets/images/infinity.png")}
      style={{
        width: width || 150,
        height: height || 100,
        resizeMode: "contain",
      }}
    />
  );
}
