import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  doSetSelectedPromotionBill,
  doSetSelectedPromotionFood,
  doSetSelectedPromotionSeat,
  doSetSelectedRoom,
} from "../../redux/booking/bookingSlice";
import {
  fetchPromotionByBill,
  fetchPromotionByFood,
  fetchPromotionByTicket,
} from "../../services/PromotionAPI";
import { callFetchRoomById } from "../../services/RoomAPI";
import BookingUtils from "../../utils/bookingUtils";
import { formatCurrency } from "../../utils/formatData";
import NotificationPromotion from "../Notification/NotificationPromotion";
import styles from "./Styles";

const BookingSummary = () => {
  const { CalculateTotalPrice } = BookingUtils();

  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);
  const selectedPromotionBill = useSelector(
    (state) => state.booking.selectedPromotionBill
  );
  const selectedPromotionSeat = useSelector(
    (state) => state.booking.selectedPromotionSeat
  );
  const selectedPromotionFood = useSelector(
    (state) => state.booking.selectedPromotionFood
  );
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );
  const selectedCinema = useSelector((state) => state.booking.selectedCinema);

  useEffect(() => {
    console.log("selectedPromotionBill: ", selectedPromotionBill);
  }, [selectedPromotionBill]);

  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); // State để điều khiển việc hiển thị NotificationPromotion
  const [promotion, setPromotion] = useState(null); // State để lưu promotion hiện tại

  // Reset state when leaving BookingSummary screen

  const handleClose = () => {
    setPromotion(null);
    setModalVisible(false);
  };

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

  useEffect(() => {
    if (selectedSeats || selectedFoods || selectedPromotionBill) {
      CalculateTotalPrice(
        selectedSeats,
        selectedFoods,
        roomPrice,
        selectedPromotionBill,
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
    try {
      const resPromotion = await fetchPromotionByBill(price);
      if (resPromotion) {
        if (resPromotion?.id !== selectedPromotionBill?.id) {
          console.log(
            "resPromotion: ",
            resPromotion.id,
            selectedPromotionBill.id
          );
          dispatch(doSetSelectedPromotionBill(resPromotion));
          setPromotion(resPromotion); // Lưu promotion vào state
          setModalVisible(true); // Hiển thị NotificationPromotion
        }
      }
    } catch (error) {
      console.log("Error getPromotionByBill: ", error);
    }
  };

  // fetch promotion by seat
  useEffect(() => {
    if (selectedSeats.length > 0 && selectedShowTime?.id) {
      getPromotionByTicket(selectedSeats, selectedShowTime.id);
    } else {
      dispatch(doSetSelectedPromotionSeat({}));
    }
  }, [selectedSeats]);

  const getPromotionByTicket = async (seats, showTimeId) => {
    const resPromotion = await fetchPromotionByTicket(seats, showTimeId);
    if (resPromotion) {
      if (resPromotion?.id !== selectedPromotionSeat?.id) {
        dispatch(doSetSelectedPromotionSeat(resPromotion));
        setPromotion(resPromotion); // Lưu promotion vào state
        setModalVisible(true); // Hiển thị NotificationPromotion
      }
    }
  };

  // fetch promotion by food
  useEffect(() => {
    if (selectedFoods.length > 0 && selectedCinema) {
      getPromotionByFood(selectedFoods, selectedCinema);
    } else {
      dispatch(doSetSelectedPromotionFood({}));
    }
  }, [selectedFoods]);

  const getPromotionByFood = async (foods, cinemaId) => {
    const resPromotion = await fetchPromotionByFood(foods, cinemaId);
    if (resPromotion) {
      if (resPromotion?.id !== selectedPromotionFood?.id) {
        dispatch(doSetSelectedPromotionFood(resPromotion));
        setPromotion(resPromotion); // Lưu promotion vào state
        setModalVisible(true); // Hiển thị NotificationPromotion
      }
    }
  };

  return (
    <>
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
      <NotificationPromotion
        promotion={promotion}
        modalVisible={modalVisible}
        handleClose={handleClose}
      />
    </>
  );
};

export default BookingSummary;
