import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { fetchTypeSeat } from "../../services/ShowTimeAPI";
import { COLORS } from "../../theme/theme";
import styles from "./Styles";
const { width, height } = Dimensions.get("window");

const Seat = ({ seatData, onPress }) => {
  const [typeSeat, setTypeSeat] = useState([]);

  useEffect(() => {
    fetchTypeSeats();
  }, []);

  const fetchTypeSeats = async () => {
    const resTypeSeat = await fetchTypeSeat();
    setTypeSeat(resTypeSeat);
  };

  const { name, status, type } = seatData;
  let backgroundColor = COLORS.White;
  let seatTextColor = COLORS.Black;

  if (status === 0) {
    backgroundColor = COLORS.DarkGrey; // Set background color for unavailable seats
    seatTextColor = COLORS.White;
  } else if (status === 2) {
    backgroundColor = COLORS.Orange; // Set background color for selected seats
    seatTextColor = COLORS.White;
  } else {
    backgroundColor = COLORS.White; // Set background color for available seats
    seatTextColor = COLORS.Black;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.seat,
        {
          backgroundColor,
          borderColor:
            type === "VIP"
              ? COLORS.Orange
              : type === "SWEETBOX"
              ? COLORS.Purple
              : COLORS.Grey,
          width: type === "SWEETBOX" ? 50 : width / 11 - 1,
        },
      ]}
    >
      <Text style={[styles.seatText, { color: seatTextColor }]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Seat;
