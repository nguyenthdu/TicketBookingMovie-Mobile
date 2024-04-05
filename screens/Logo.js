import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { COLORS, SIZES } from "../theme/theme";

export default function Logo({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển sang màn hình Home sau 5 giây
      navigation.navigate("Home");
    }, 1000);

    // Xóa hẹn giờ khi component bị unmount để tránh memory leaks
    return () => clearTimeout(timer);
  }, []); // [] ensures that useEffect runs only once after the component mounts

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: COLORS.White,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginLeft: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/logo3.jpg")}
          style={{
            borderRadius: SIZES.radius1,
            width: "80%",
            height: 200,
            resizeMode: "cover",
          }}
        />
        <View
          style={{
            width: "20%",
          }}
        ></View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,

            color: COLORS.Orange,
            fontWeight: "bold",
          }}
        >
          InfinityCine
        </Text>
        <Text
          style={{
            fontSize: SIZES.font1,
            color: COLORS.Grey,
            fontWeight: "bold",
          }}
        >
          Đặt vé mọi lúc mọi nơi
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginRight: 20,
        }}
      >
        <View
          style={{
            width: "20%",
          }}
        ></View>
        <Image
          source={require("../assets/images/logo1.jpg")}
          style={{
            borderRadius: SIZES.radius1,
            width: "80%",
            height: 200,
            resizeMode: "cover",
          }}
        />
      </View>
    </View>
  );
}
