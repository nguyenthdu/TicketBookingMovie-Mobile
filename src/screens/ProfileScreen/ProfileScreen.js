import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";

export default function ProfileScreen() {
  return (
    <View>
      <Text
        style={{
          marginTop: 100,
          fontSize: 20,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        ProfileScreen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
