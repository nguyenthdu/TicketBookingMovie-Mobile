import React, { useState } from "react";
import { Dimensions, PanResponder, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const ExpenseSlider = () => {
  const [expense, setExpense] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const maxExpense = 2000000;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newExpense = Math.max(
        0,
        Math.min(maxExpense, (gestureState.dx / sliderWidth) * maxExpense)
      );
      setExpense(newExpense);
    },
  });

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Chi tiêu:{" "}
        {expense.toLocaleString(undefined, { maximumFractionDigits: 0 })} VND
      </Text>
      <View
        style={styles.sliderContainer}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        <View style={styles.sliderTrack} />
        <View
          style={[
            styles.sliderThumb,
            { left: (expense / maxExpense) * sliderWidth - 10 },
          ]}
        />
      </View>
      <View style={styles.scale}>
        <Text>0</Text>
        <Text>1,000,000</Text>
        <Text>2,000,000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 20,
  },
  sliderContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#d3d3d3",
    position: "absolute",
    left: 0,
    right: 0,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1E90FF",
    position: "absolute",
    top: 10,
  },
  scale: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    paddingBottom: 10,
  },
});

export default ExpenseSlider;
