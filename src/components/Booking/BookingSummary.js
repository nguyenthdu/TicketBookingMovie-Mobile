import React from "react";
import { Text, View } from "react-native";
import styles from "./Styles";

const BookingSummary = ({ selectedSeats, selectedFoods }) => {
  return (
    <View style={styles.container}>
      <View style={styles.seatSelected}>
        <Text style={styles.textStyle}>{selectedSeats.length}x: </Text>
        <View style={styles.rightContainer}>
          {selectedSeats.map((seat, index) => (
            <Text
              key={index}
              style={[
                styles.textStyle,
                styles.gapStyle,
                { fontWeight: "normal" },
              ]}
            >
              {seat}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.calculateTotal}>
        <Text style={styles.textStyle}>Tổng tiền: </Text>
        <View style={styles.rightContainer}>
          <Text style={[styles.textStyle, { fontWeight: "normal" }]}>
            {calculateTotal(selectedSeats, selectedFoods)} VNĐ
          </Text>
        </View>
      </View>
    </View>
  );
};

const calculateTotal = (selectedSeats, selectedFoods) => {
  const seatPrice = selectedSeats.length * 100000;
  const foodPrice = selectedFoods.reduce(
    (total, food) => total + food.price,
    0
  );
  return seatPrice + foodPrice;
};

export default BookingSummary;
