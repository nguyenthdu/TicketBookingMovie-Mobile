import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { doResetBooking } from "../../redux/booking/bookingSlice";
import {
  decrementCountdownTime,
  doSetIsRunning,
  resetCountdownTime,
} from "../../redux/counter/counterSlice";
import { callHoldSeats } from "../../services/ShowTimeAPI";
import { COLORS, FONTSIZE } from "../../theme/theme";

const CountUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );
  const countdownTime = useSelector((state) => state.counter.countdownTime);

  useEffect(() => {
    if (countdownTime === 0) {
      handleFinish();
    }
  }, [countdownTime]);

  const handleFinish = async () => {
    const resHoldSeats = await callHoldSeats(
      selectedSeats,
      selectedShowTime.id,
      true
    );
    if (resHoldSeats?.status === 200) {
      dispatch(doSetIsRunning(false));
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đã hết thời gian giữ ghế, vui lòng chọn lại!",
      });
      navigation.navigate("Home");
      dispatch(doResetBooking());
      dispatch(resetCountdownTime(420));
    }
  };

  // giải thích
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decrementCountdownTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        backgroundColor: COLORS.warning,
      }}
    >
      <Text style={{ color: COLORS.Black, fontSize: FONTSIZE.size_16 }}>
        Thời gian giữ ghế:
      </Text>
      <Text style={{ color: COLORS.Black, fontSize: FONTSIZE.size_16 }}>
        {formatTime(countdownTime)}
      </Text>
    </View>
  );
};

export default CountUp;
