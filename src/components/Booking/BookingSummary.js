import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  doSetSelectedPromotionBill,
  doSetSelectedRoom,
} from "../../redux/booking/bookingSlice";
import { fetchPromotionByBill } from "../../services/PromotionAPI";
import { callFetchRoomById } from "../../services/RoomAPI";
import { formatCurrency } from "../../utils/formatData";
import styles from "./Styles";

const BookingSummary = () => {
  const [roomPrice, setRoomPrice] = useState(0);
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );

  // lấy giá phòng
  useEffect(() => {
    if (selectedShowTime) {
      fetchRoomById(selectedShowTime.roomId);
    }
  }, [selectedShowTime]);

  const fetchRoomById = async (id) => {
    const res = await callFetchRoomById(id);
    if (res) {
      setRoomPrice(res.price);
      dispatch(doSetSelectedRoom(res));
    }
  };

  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedPromotionBill = useSelector(
    (state) => state.booking.selectedPromotionBill
  );
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("selectedPromotionBill redux: ", selectedPromotionBill);
  }, [selectedPromotionBill]);

  useEffect(() => {
    if (selectedSeats || selectedFoods || selectedPromotionBill) {
      calculateTotalPrice();
    }
  }, [selectedSeats, selectedFoods, selectedPromotionBill]);

  const calculateTotalPrice = () => {
    let newTotalPrice = 0;

    // Tính tổng tiền cho các ghế ngồi
    selectedSeats.forEach((seat) => {
      const seatPrice = seat.price;
      newTotalPrice += seatPrice + roomPrice;
    });

    // Tính tổng tiền cho các món đồ ăn
    selectedFoods.forEach((food) => {
      newTotalPrice += food.price * food.quantity;
    });

    // Áp dụng khuyến mãi nếu có
    if (selectedPromotionBill !== null) {
      if (
        selectedPromotionBill.typePromotion === "DISCOUNT" &&
        selectedPromotionBill.promotionDiscountDetailDto.typeDiscount ===
          "PERCENT"
      ) {
        const minBillValue =
          selectedPromotionBill.promotionDiscountDetailDto.minBillValue;
        // Kiểm tra nếu tổng giá trị hóa đơn đạt tối thiểu thì mới áp dụng khuyến mãi
        if (newTotalPrice >= minBillValue) {
          const discountValue =
            selectedPromotionBill.promotionDiscountDetailDto.discountValue;
          const maxValue =
            selectedPromotionBill.promotionDiscountDetailDto.maxValue;
          const discountedPrice = newTotalPrice * (1 - discountValue / 100);

          // Kiểm tra nếu giá giảm đã bằng hoặc vượt quá maxValue thì giữ nguyên giá trị tổng giá
          const finalPrice =
            discountedPrice <= maxValue
              ? discountedPrice
              : newTotalPrice - maxValue;

          newTotalPrice = finalPrice;
        } else {
          dispatch(doSetSelectedPromotionBill({}));
        }
      }
    }

    // Cập nhật tổng giá mới
    setTotalPrice(newTotalPrice);
  };

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
