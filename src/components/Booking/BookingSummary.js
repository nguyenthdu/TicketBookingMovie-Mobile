import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  doSetSelectedPromotionBill,
  doSetSelectedRoom,
} from "../../redux/booking/bookingSlice";
import { fetchPromotionByBill } from "../../services/PromotionAPI";
import { callFetchRoomById } from "../../services/RoomAPI";
import { calculateTotalPrice } from "../../utils/bookingUtils";
import { formatCurrency } from "../../utils/formatData";
import styles from "./Styles";

const BookingSummary = () => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);
  const selectedPromotionBill = useSelector(
    (state) => state.booking.selectedPromotionBill
  );
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );

  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // lấy giá phòng
  useEffect(() => {
    if (selectedShowTime) {
      fetchRoomById(selectedShowTime.roomId);
    }
  }, [selectedShowTime]);

  const fetchRoomById = async (id) => {
    const res = await callFetchRoomById(id);
    console.log("res price: ", res);
    if (res) {
      setRoomPrice(res.price);
      dispatch(doSetSelectedRoom(res));
    }
  };

  useEffect(() => {
    if (selectedSeats || selectedFoods || selectedPromotionBill) {
      calculateTotalPrice(
        selectedSeats,
        selectedFoods,
        roomPrice,
        selectedPromotionBill,
        dispatch,
        setTotalPrice
      );
    }
  }, [selectedSeats, selectedFoods, selectedPromotionBill]);

  // fetch promotion by bill
  useEffect(() => {
    if (totalPrice > 0) {
      getPromotionByBill(totalPrice);
    } else {
      dispatch(doSetSelectedPromotionBill({}));
    }
  }, [totalPrice]);

  const getPromotionByBill = async (price) => {
    const resPromotion = await fetchPromotionByBill(price);
    if (resPromotion) {
      if (resPromotion.id !== selectedPromotionBill?.id) {
        console.log("so sanh: ", resPromotion.id, selectedPromotionBill.id);
        dispatch(doSetSelectedPromotionBill(resPromotion));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.seatSelected}>
          {selectedSeats.length > 0 && (
            <>
              <Text style={styles.textStyle}>
                {selectedSeats.length}x ghế:{" "}
              </Text>
              <View style={styles.rightContainer}>
                {selectedSeats.length > 0 &&
                  selectedSeats.map((seat, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.textStyle,
                        styles.gapStyle,
                        { fontWeight: "normal" },
                      ]}
                    >
                      {seat.name},
                    </Text>
                  ))}
              </View>
            </>
          )}
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {selectedFoods.length > 0 && (
            <>
              <Text style={styles.textStyle}>Đồ ăn: </Text>
              <View style={styles.rightContainer}>
                {selectedFoods.length > 0 &&
                  selectedFoods.map((food, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.textStyle,
                        styles.gapStyle,
                        { fontWeight: "normal" },
                      ]}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        {food.quantity}x{" "}
                      </Text>
                      {food.name},
                    </Text>
                  ))}
              </View>
            </>
          )}
        </View>
      </View>
      <View style={styles.calculateTotal}>
        {totalPrice > 0 && (
          <>
            <Text style={styles.textStyle}>Tổng tiền: </Text>
            <View style={styles.rightContainer}>
              <Text style={[styles.textStyle, { fontWeight: "normal" }]}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default BookingSummary;
