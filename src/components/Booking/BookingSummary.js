import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { doSetSelectedPromotionBill } from "../../redux/booking/bookingSlice";
import { fetchPromotionByBill } from "../../services/PromotionAPI";
import { calculatorPrice } from "../../utils/bookingUtils";
import { formatCurrency } from "../../utils/formatData";
import styles from "./Styles";

const BookingSummary = () => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedPromotionBill = useSelector(
    (state) => state.booking.selectedPromotionBill
  );
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("selectedSeats: ", selectedSeats);
    console.log("selectedFoods: ", selectedFoods);
    console.log("selectedPromotionBill: ", selectedPromotionBill);
  }, [selectedPromotionBill, selectedSeats, selectedFoods]);

  useEffect(() => {
    const total = calculatorPrice(selectedSeats, selectedFoods);
    setTotalPrice(total);
  }, [selectedSeats, selectedFoods]);

  // fetch promotion by bill
  useEffect(() => {
    if (totalPrice <= 0) {
      return;
    } else if (
      selectedPromotionBill &&
      selectedPromotionBill?.promotionDiscountDetailDto?.minBillValue >
        totalPrice
    ) {
      dispatch(doSetSelectedPromotionBill({}));
    } else {
      getPromotionByBill(totalPrice);
    }
  }, [totalPrice]);

  const getPromotionByBill = async (price) => {
    const resPromotion = await fetchPromotionByBill(price);
    if (resPromotion) {
      if (resPromotion.code === selectedPromotionBill.code) {
        return;
      } else {
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
