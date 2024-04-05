import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ShowTime({ route, navigation }) {
  const { movie } = route.params;

  return (
    <View>
      <Text>ShowTime</Text>
      <Text>{movie.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
