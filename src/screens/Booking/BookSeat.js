import { MaterialIcons } from "@expo/vector-icons";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import BookingSummary from "../../components/Booking/BookingSummary";
import Divider from "../../components/Divider/Divider";
import SeatMap from "../../components/Seat/SeatMap";
import SeatOption from "../../components/Seat/SeatOption";
import { COLORS } from "../../theme/theme";
import styles from "./Styles";

const BookSeat = ({ navigation, route }) => {
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  //handle book seat
  const handleBookSeat = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ghế trước khi tiếp tục");
      return;
    }
    navigation.navigate("Food", { cinemaId: route.params.cinemaId });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleGoBack()} style={styles.btnGoBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={[styles.textStyle, styles.titleStyle]}>Đặt vé</Text>
      </TouchableOpacity>
      <Text style={[styles.textStyle, styles.textScreen]}>Màn hình</Text>
      <Divider bdWidth={5} bdColor={COLORS.Yellow} lineWidth={40} />
      {/* render danh sách ghế */}
      <View
        style={{
          flex: 4.1 / 6,
          flexDirection: "row",
          marginTop: 10,
          marginHorizontal: 16,
          backgroundColor: COLORS.White,
        }}
      >
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}
        >
          <SeatMap />
        </ReactNativeZoomableView>
      </View>
      <Divider />
      {/* Giải thích loại ghế */}
      <View style={{ flex: 0.7 / 6 }}>
        <View style={styles.SeatOptionContainer}>
          <SeatOption type="bd" color={COLORS.DarkGrey} label="Ghế thường" />
          <SeatOption type="bd" color={COLORS.Orange} label="Ghế vip" />
          <SeatOption type="bd" color={COLORS.Pink} label="Ghế đôi" />
        </View>
        <View style={styles.SeatOptionContainer}>
          <SeatOption type="bgc" color={COLORS.DarkGrey} label="Ghế đã bán" />
          <SeatOption type="bgc" color={COLORS.Orange} label="Ghế đang chọn" />
        </View>
      </View>
      {/* hiện danh sách ghế đã chọn */}
      <Divider />
      <View style={{ flex: 2.2 / 6 }}>
        <BookingSummary />
        <TouchableOpacity onPress={handleBookSeat} style={styles.btnContinue}>
          <Text style={styles.textBtnContinue}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookSeat;
