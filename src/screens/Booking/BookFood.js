import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import imageWarning from "../../assets/images/warning.png";
import BookingSummary from "../../components/Booking/BookingSummary";
import QuantitySelector from "../../components/Booking/QuantitySelector";
import NotificationMain, {
  CustomAlert,
} from "../../components/Notification/NotificationMain";
import NotificationPromotion from "../../components/Notification/NotificationPromotion";
import CountUp from "../../components/Spin/CountUp";
import {
  doSetSelectedFoods,
  doSetSelectedPromotionFood,
} from "../../redux/booking/bookingSlice";
import { doSetIsRunning } from "../../redux/counter/counterSlice";
import { getAllFood } from "../../services/FoodAPI";
import { fetchPromotionByFood } from "../../services/PromotionAPI";
import { callHoldSeats } from "../../services/ShowTimeAPI";
import { COLORS, FONTSIZE } from "../../theme/theme";
import { formatCurrency } from "../../utils/formatData";
import styles from "./Styles";

const { width, height } = Dimensions.get("window");

const Food = ({ route, navigation }) => {
  const { cinemaId } = route.params;
  const { showAlert, modalVisible, message, hideAlert } = NotificationMain();
  const dispatch = useDispatch();
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);
  const selectedPromotionFood = useSelector(
    (state) => state.booking.selectedPromotionFood
  );
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const isRunning = useSelector((state) => state.counter.isRunning);

  const [food, setFood] = useState([]);
  const [modalVisiblea, setModalVisible] = useState(false); // State để điều khiển việc hiển thị NotificationPromotion
  const [promotion, setPromotion] = useState(null); // State để lưu promotion hiện tại

  // fetch promotion by food
  useEffect(() => {
    if (selectedFoods.length > 0 && cinemaId) {
      getPromotionByFood(selectedFoods, cinemaId);
    } else {
      dispatch(doSetSelectedPromotionFood({}));
    }
  }, [selectedFoods]);

  const getPromotionByFood = async (foods, cinemaId) => {
    const resPromotion = await fetchPromotionByFood(foods, cinemaId);
    console.log("resPromotion: ", resPromotion?.id);
    if (resPromotion) {
      if (resPromotion?.id !== selectedPromotionFood?.id) {
        dispatch(doSetSelectedPromotionFood(resPromotion));
        setPromotion(resPromotion); // Lưu promotion vào state
        setModalVisible(true); // Hiển thị NotificationPromotion
      }
    }
  };

  useEffect(() => {
    if (cinemaId) {
      fetchFood(cinemaId);
    }
  }, [cinemaId]);

  const fetchFood = async (cinemaId) => {
    const data = await getAllFood(cinemaId);
    const foodWithKeys = data.map((food, index) => ({
      ...food,
      idIndex: index.toString(),
    }));
    setFood(foodWithKeys);
  };

  const increaseQuantity = (item) => {
    const newSelectedFoods = [...selectedFoods];
    const index = newSelectedFoods.findIndex((food) => food.id === item.id);

    if (index !== -1) {
      newSelectedFoods[index] = {
        ...newSelectedFoods[index],
        quantity: (newSelectedFoods[index].quantity || 0) + 1,
      };
    } else {
      newSelectedFoods.push({
        ...item,
        quantity: 1,
      });
    }

    dispatch(doSetSelectedFoods(newSelectedFoods));
  };

  const decreaseQuantity = (item) => {
    const newSelectedFoods = [...selectedFoods];
    const index = newSelectedFoods.findIndex((food) => food.id === item.id);

    if (index !== -1) {
      const newQuantity = Math.max(
        (newSelectedFoods[index].quantity || 0) - 1,
        0
      );
      if (newQuantity === 0) {
        newSelectedFoods.splice(index, 1); // Xóa mặt hàng khỏi selectedFoods nếu số lượng giảm về 0
      } else {
        newSelectedFoods[index] = {
          ...newSelectedFoods[index],
          quantity: newQuantity,
        };
      }
      dispatch(doSetSelectedFoods(newSelectedFoods));
    }
  };

  const handleBookSeat = () => {
    navigation.navigate("Payment");
  };

  const fetchHoldSeatTrue = async (status) => {
    const resHoldSeats = await callHoldSeats(
      selectedSeats,
      selectedShowTime.id,
      status
    );
    if (resHoldSeats?.status === 200) {
      return true;
    } else {
      showAlert(resHoldSeats.response.data.message);
      return false;
    }
  };

  const handleGoBack = async () => {
    const checkedHold = await fetchHoldSeatTrue(true);
    if (checkedHold) {
      dispatch(doSetIsRunning(false));
    }
    navigation.goBack();
  };

  useEffect(() => {
    console.log("isrunning: ", isRunning);
  }, [isRunning]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGoBack}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.textStyle, styles.titleStyle]}>Chọn đồ ăn</Text>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 10,
          flex: 1,
        }}
      >
        {isRunning && <CountUp startTime={420} />}

        {food.length === 0 ? (
          <Text>Hiện tại rạp chưa có tính năng chọn đồ ăn online!</Text>
        ) : (
          <FlatList
            data={food}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.DarkGrey,
                  //   justifyContent: "space-between",
                }}
              >
                <Image
                  source={item?.image ? { uri: item.image } : imageWarning}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    marginLeft: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_18,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_16,
                      fontWeight: "bold",
                      color: COLORS.DarkGrey,
                    }}
                  >
                    {item.size}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_16,
                      fontWeight: "bold",

                      color: COLORS.Orange,
                    }}
                  >
                    {formatCurrency(item.price)}
                  </Text>
                </View>
                {/* Tạo chọn số lượng */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    right: 0,
                    bottom: height * 0.05,
                  }}
                >
                  {item.price || item.quantity === 0 ? (
                    <QuantitySelector
                      quantity={
                        selectedFoods.find((food) => food.id === item.id)
                          ?.quantity || 0
                      }
                      decreaseQuantity={() => decreaseQuantity(item)}
                      increaseQuantity={() => increaseQuantity(item)}
                    />
                  ) : (
                    <Text style={[styles.textStyle, { color: COLORS.warning }]}>
                      Không có sẵn
                    </Text>
                  )}
                </View>
              </View>
            )}
          />
        )}
      </View>
      <Divider />
      <View style={{ flex: 2.3 / 6 }}>
        <BookingSummary />
        <TouchableOpacity
          onPress={() => handleBookSeat()}
          style={styles.btnContinue}
        >
          <Text style={styles.textBtnContinue}>Tiếp tục</Text>
        </TouchableOpacity>
        <NotificationPromotion
          promotion={promotion}
          modalVisible={modalVisiblea}
          handleClose={() => setModalVisible(false)}
        />
        <CustomAlert
          modalVisible={modalVisible}
          message={message}
          hideAlert={hideAlert}
        />
      </View>
    </SafeAreaView>
  );
};

export default Food;
