import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import PaymentItem from "../../components/Booking/PaymentItem";
import PromotionItem from "../../components/Booking/PromotionItem";
import Divider from "../../components/Divider/Divider";
import CountUp from "../../components/Spin/CountUp";
import { doSetIsRunning } from "../../redux/counter/counterSlice";
import { doSetLoading } from "../../redux/spin/spinSlice";
import { createInvoice } from "../../services/invoice";
import { COLORS, FONTSIZE } from "../../theme/theme";
import { PriceFood, PriceSeats } from "../../utils/bookingUtils";
import {
  dateFormat,
  formatCurrency,
  formatTime,
  getDayInfo,
} from "../../utils/formatData";
import styles from "./Styles";

const { width, height } = Dimensions.get("window");

const data = [{ id: 1, title: "Thanh toán thông qua ứng dụng VNPAY" }];

export default function Payment({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const selectedMovie = useSelector((state) => state.booking.selectedMovie);
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedRoom = useSelector((state) => state.booking.selectedRoom);
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);
  const totalPrice = useSelector((state) => state.booking.totalPrice);
  const selectedPromotionBill = useSelector(
    (state) => state.booking.selectedPromotionBill
  );
  const selectedPromotionSeat = useSelector(
    (state) => state.booking.selectedPromotionSeat
  );
  const selectedPromotionFood = useSelector(
    (state) => state.booking.selectedPromotionFood
  );
  const isRunning = useSelector((state) => state.counter.isRunning);

  //xử lý thanh toán
  // const handlePayment = async () => {
  //   console.log("user email: ", user?.email);
  //   // dispatch(doSetLoading(true));
  //   const resPayment = await createInvoiceVnPay(
  //     totalPrice,
  //     selectedShowTime.id,
  //     selectedSeats,
  //     selectedFoods,
  //     user?.email
  //   );
  //   console.log("resPayment", resPayment);
  //   if (resPayment?.status === 200) {
  //     // dispatch(doSetLoading(false));
  //     navigation.navigate("VnPay", { url: resPayment.message });
  //   } else {
  //     // dispatch(doSetLoading(false));
  //     Toast.show({
  //       type: "error",
  //       text1: resPayment?.message || "Thanh toán thất bại",
  //       visibilityTime: 2000,
  //     });
  //   }
  // };

  const handlePayment = async () => {
    console.log("user email: ", user?.email);
    dispatch(doSetIsRunning(false));
    dispatch(doSetLoading(true));
    const resPayment = await createInvoice(
      selectedShowTime.id,
      selectedSeats,
      selectedFoods,
      user?.email
    );
    console.log("resPayment", resPayment);
    dispatch(doSetLoading(false));
    if (resPayment?.status === 200) {
      Toast.show({
        type: "success",
        text1: resPayment?.message,
        visibilityTime: 2000,
      });
      // chuyển qua trang hóa đơn
      navigation.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        text1: resPayment?.message || "Thanh toán thất bại!",
        visibilityTime: 2000,
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity onPress={() => handleGoBack()} style={styles.btnGoBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={[styles.textStyle, styles.titleStyle]}>Thanh toán</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 2 / 3,
          marginTop: 10,
          backgroundColor: COLORS.Grey,
        }}
      >
        {isRunning && <CountUp />}
        {/* phim */}
        <View style={styles.cardMovie}>
          <Image
            source={{ uri: selectedMovie?.imageLink }}
            style={{
              borderRadius: 10,
              width: width * 0.3,
              resizeMode: "contain",
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.textMovie}>{selectedMovie?.name}</Text>
            <Text style={{ fontSize: FONTSIZE.size_16 }}>
              Rạp: {selectedShowTime?.cinemaName}
            </Text>
            <Text style={{ fontSize: FONTSIZE.size_16 }}>
              Phòng: {selectedShowTime?.roomName}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ fontSize: FONTSIZE.size_16, fontWeight: "500" }}>
                {formatTime(selectedShowTime?.showTime)}{" "}
              </Text>
              <Text style={{ fontSize: FONTSIZE.size_16 }}>
                - {getDayInfo(selectedShowTime?.showDate)},{" "}
                {dateFormat(selectedShowTime?.showDate)}
              </Text>
            </View>
          </View>
        </View>
        {/* Thông tin giao dịch */}
        <Text style={{ marginLeft: 15, marginBottom: 10 }}>
          Thông tin giao dịch
        </Text>
        <View style={styles.cardTransaction}>
          {/* ghế */}
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ fontSize: FONTSIZE.size_16, flex: 1 }}>
              {selectedSeats.length}x ghế:{" "}
              {selectedSeats.map((seat) => seat.name).join(", ")}
            </Text>
            <Text style={{ fontSize: FONTSIZE.size_16, fontWeight: "500" }}>
              {formatCurrency(PriceSeats(selectedSeats, selectedRoom.price))}
            </Text>
          </View>
          <Divider
            bdWidth={2}
            marginTop={1}
            marginBottom={10}
            borderStyle={"dashed"}
            lineWidth={1}
          />
          {/* đồ ăn */}
          <View style={{ marginBottom: 10 }}>
            {selectedFoods.map((food, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: FONTSIZE.size_16 }}>
                  {food.quantity}x {food.name}
                </Text>
                <Text style={{ fontSize: FONTSIZE.size_16, fontWeight: "500" }}>
                  {formatCurrency(PriceFood(food))}
                </Text>
              </View>
            ))}
          </View>
          {selectedFoods.length > 0 && (
            <Divider
              bdWidth={2}
              marginTop={1}
              marginBottom={10}
              borderStyle={"dashed"}
              lineWidth={1}
            />
          )}
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: FONTSIZE.size_16, fontWeight: "500" }}>
              Tổng cộng
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {PriceSeats(selectedSeats, selectedRoom.price) +
                selectedFoods.reduce(
                  (acc, food) => acc + PriceFood(food),
                  0
                ) ===
              totalPrice ? (
                <Text style={{ fontSize: FONTSIZE.size_16, fontWeight: "500" }}>
                  {formatCurrency(totalPrice)}
                </Text>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_16,
                      fontWeight: "500",
                      marginRight: 10,
                      color: COLORS.DarkGrey,
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                    }}
                  >
                    {formatCurrency(
                      PriceSeats(selectedSeats, selectedRoom.price) +
                        selectedFoods.reduce(
                          (acc, food) => acc + PriceFood(food),
                          0
                        )
                    )}
                  </Text>
                  <Text
                    style={{ fontSize: FONTSIZE.size_16, fontWeight: "500" }}
                  >
                    {formatCurrency(totalPrice)}
                  </Text>
                </>
              )}
            </View>
          </View>
          {(selectedPromotionBill?.code ||
            selectedPromotionSeat?.code ||
            selectedPromotionFood.length > 0) && (
            <Divider
              bdWidth={2}
              marginTop={1}
              marginBottom={10}
              borderStyle={"dashed"}
              lineWidth={1}
            />
          )}
          <PromotionItem
            promotionBill={selectedPromotionBill}
            promotionFoods={selectedPromotionFood}
            promotionSeats={selectedPromotionSeat}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1 / 3,
          backgroundColor: COLORS.Grey,
        }}
      >
        <Text
          style={{
            marginLeft: 15,
            marginBottom: 10,
          }}
        >
          Phương thức thanh toán
        </Text>
        <View style={styles.cardPayment}>
          <Text
            style={{
              fontSize: FONTSIZE.size_16,
              fontWeight: "500",
              marginBottom: 10,
            }}
          >
            Thanh toán
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PaymentItem title={item.title} />}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handlePayment} style={styles.btnContinue}>
        <Text style={styles.textBtnContinue}>Thanh toán</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
