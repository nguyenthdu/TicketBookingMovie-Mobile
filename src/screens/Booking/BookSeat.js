import { MaterialIcons } from "@expo/vector-icons";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BookingSummary from "../../components/Booking/BookingSummary";
import Divider from "../../components/Divider/Divider";
import NotificationMain, {
  CustomAlert,
} from "../../components/Notification/NotificationMain";
import SeatMap from "../../components/Seat/SeatMap";
import SeatOption from "../../components/Seat/SeatOption";
import { doSetIsRunning } from "../../redux/counter/counterSlice";
import {
  callCheckHoldSeat,
  callHoldSeats,
  fetchTypeSeat,
} from "../../services/ShowTimeAPI";
import { COLORS } from "../../theme/theme";
import styles from "./Styles";

const BookSeat = ({ navigation, route }) => {
  const { showAlert, modalVisible, message, hideAlert } = NotificationMain();
  const dispatch = useDispatch();

  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );

  const zoomView = useRef();

  const [typeSeat, setTypeSeat] = useState(null);

  // fetch type seat để so sánh loại ghế
  useEffect(() => {
    getTypeSeat();
  }, []);

  const getTypeSeat = async () => {
    const resTypeSeat = await fetchTypeSeat();
    setTypeSeat(resTypeSeat);
  };

  // ----------giữ ghế trong 7 phút----------

  // kiểm tra ghế đã được chọn có bị ai chọn trước không
  const fetchCheckSeat = async (seats, showTimeId) => {
    const resCheckHoldSeat = await callCheckHoldSeat(seats, showTimeId);
    if (resCheckHoldSeat?.status === 200) {
      if (resCheckHoldSeat.message === null) {
        return false;
      } else {
        showAlert(resCheckHoldSeat.message);
        return true;
      }
    }
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

  //handle book seat
  const handleBookSeat = async () => {
    if (selectedSeats.length === 0) {
      showAlert("Vui lòng chọn ghế trước khi tiếp tục");
      return;
    } else {
      const checkSeat = await fetchCheckSeat(
        selectedSeats,
        selectedShowTime.id
      );
      if (checkSeat) {
        return;
      } else {
        const checkedHold = await fetchHoldSeatTrue(false);
        if (checkedHold) {
          dispatch(doSetIsRunning(true));
          navigation.navigate("Food", { cinemaId: route.params.cinemaId });
        }
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.btnGoBack} onPress={() => handleGoBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={[styles.textStyle, styles.titleStyle]}>Đặt vé</Text>
      </TouchableOpacity>
      {/* render danh sách ghế */}
      <View
        style={{
          flex: 4.1 / 6,
          // flexDirection: "row",
          marginTop: 10,
          marginHorizontal: 16,
          backgroundColor: COLORS.White,
        }}
      >
        <ReactNativeZoomableView
          ref={zoomView}
          maxZoom={1.5}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          onZoomAfter={(event, gestureState, zoomableViewEventObject) => {
            // console.log("onZoomAfter", zoomableViewEventObject);
            return null;
          }}
        >
          <View style={{ width: "100%", paddingBottom: 5 }}>
            <Text style={[styles.textStyle, styles.textScreen]}>Màn hình</Text>
            <Divider bdWidth={5} bdColor={COLORS.Yellow} lineWidth={40} />
          </View>
          <SeatMap typeSeat={typeSeat} />
        </ReactNativeZoomableView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={styles.btnQuantity}
            onPress={() => zoomView.current.zoomBy(-0.5)}
          >
            <MaterialIcons name="remove" size={24} color={COLORS.Orange} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnQuantity}
            onPress={() => zoomView.current.zoomBy(0.5)}
          >
            <MaterialIcons name="add" size={24} color={COLORS.Orange} />
          </TouchableOpacity>
        </View>
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
      <CustomAlert
        modalVisible={modalVisible}
        message={message}
        hideAlert={hideAlert}
      />
    </SafeAreaView>
  );
};

export default BookSeat;
