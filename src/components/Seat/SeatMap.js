import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { doSetSelectedSeats } from "../../redux/booking/bookingSlice";
import { fetchSeats } from "../../services/ShowTimeAPI";
import { COLORS } from "../../theme/theme";
import NotificationMain, {
  CustomAlert,
} from "../Notification/NotificationMain";
import styles from "./Styles";

const SeatMap = ({ typeSeat }) => {
  const { showAlert, modalVisible, message, hideAlert } = NotificationMain();

  // redux
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedShowTime = useSelector(
    (state) => state.booking.selectedShowTime
  );
  // get data từ server
  const [seatData, setSeatData] = useState([]);

  useEffect(() => {
    if (selectedShowTime?.id) {
      console.log("selectedShowTime: ", selectedShowTime.id);
      fetchSeatData(selectedShowTime.id);
    }
  }, [selectedShowTime]);

  const fetchSeatData = async (id) => {
    const resSeatData = await fetchSeats(id);
    resSeatData.forEach((seat) => {
      if (seat.status === false) {
        console.log("seat đã đặt: ", seat);
      }
    });
    // Sắp xếp ghế theo hàng và cột
    const sortedSeatData = resSeatData.sort((a, b) => {
      if (a.seat.seatRow === b.seat.seatRow) {
        return a.seat.seatColumn - b.seat.seatColumn;
      }
      return a.seat.seatRow - b.seat.seatRow;
    });
    setSeatData(sortedSeatData);
  };

  // Hàm để lấy màu tùy theo loại ghế
  const getTypeSeatColor = (seatTypeId, defaultColor) => {
    var seat = null;
    typeSeat?.forEach((type) => {
      if (type.id === seatTypeId) {
        seat = type;
      }
    });

    return seat?.name === "STANDARD"
      ? defaultColor
      : seat?.name === "VIP"
      ? COLORS.Orange
      : COLORS.Pink;
  };

  const handleSeatClick = (seat) => {
    // Kiểm tra xem ghế đã được chọn trước đó chưa
    const seatIndex = selectedSeats.findIndex(
      (selectedSeat) =>
        selectedSeat.seatRow === seat.seat.seatRow &&
        selectedSeat.seatColumn === seat.seat.seatColumn
    );

    // Nếu ghế đã được chọn trước đó, loại bỏ nó khỏi danh sách các ghế đã chọn
    if (seatIndex !== -1) {
      const updatedSeats = selectedSeats.filter(
        (selectedSeat) =>
          selectedSeat.seatRow !== seat.seat.seatRow ||
          selectedSeat.seatColumn !== seat.seat.seatColumn
      );
      dispatch(doSetSelectedSeats(updatedSeats));
    } else {
      if (selectedSeats.length >= 8) {
        showAlert(`Chỉ được chọn tối đa 8 ghế!`);
        return;
      }
      // Nếu ghế chưa được chọn trước đó, thêm nó vào danh sách các ghế đã chọn
      dispatch(doSetSelectedSeats([...selectedSeats, seat.seat]));
    }
  };

  // render 1 ghế
  const renderSeat = (seat, index) => {
    const isSelected = selectedSeats.some(
      (selectedSeat) =>
        selectedSeat.seatRow === seat.seat.seatRow &&
        selectedSeat.seatColumn === seat.seat.seatColumn
    );
    const seatColor = isSelected
      ? COLORS.Orange
      : getTypeSeatColor(seat.seat.seatTypeId, COLORS.DarkGrey);
    return (
      <TouchableOpacity
        style={[
          styles.seat,
          { borderWidth: 1, borderColor: seatColor },
          {
            backgroundColor: !seat.status
              ? COLORS.DarkGrey
              : isSelected
              ? seatColor
              : "transparent",
            pointerEvents: !seat.status ? "none" : "auto",
          },
        ]}
        key={index}
        onPress={() => handleSeatClick(seat)}
      >
        <Text
          style={[
            styles.seatText,
            { color: isSelected ? COLORS.White : COLORS.Black },
          ]}
        >
          {seat.seat.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // render 1 hàng ghế (20 ghế)
  const renderRow = (row, index) => {
    return (
      <View key={index} style={styles.rowSeat}>
        {Array.from({ length: 20 }, (_, i) => {
          const seat = row.find((seat) => seat.seat.seatColumn === i + 1);
          return seat ? (
            renderSeat(seat, i)
          ) : (
            <View
              style={[styles.seat, { backgroundColor: "transparent" }]}
              key={i}
            ></View>
          );
        })}
      </View>
    );
  };

  // render tất cả hàng ghế
  const renderSeatMap = () => {
    let rows = []; // Sử dụng một mảng để lưu trữ tất cả các hàng ghế
    let currentRow = 1;
    let row = []; // Sử dụng một mảng tạm thời để lưu trữ ghế của mỗi hàng
    seatData.forEach((seat, index) => {
      // Nếu ghế thuộc vào hàng mới
      if (seat.seat.seatRow !== currentRow) {
        rows.push(row); // Thêm hàng hiện tại vào mảng các hàng
        row = []; // Đặt lại mảng ghế tạm thời cho hàng mới
        currentRow = seat.seat.seatRow; // Cập nhật hàng hiện tại
      }
      row.push(seat); // Thêm ghế vào hàng hiện tại
      // Nếu là ghế cuối cùng, thêm hàng cuối cùng vào mảng các hàng
      if (index === seatData.length - 1) {
        rows.push(row);
      }
    });

    // Render tất cả các hàng
    return rows.map((row, index) => renderRow(row, index + 1));
  };

  return (
    <View style={styles.container}>
      {renderSeatMap()}
      <CustomAlert
        modalVisible={modalVisible}
        message={message}
        hideAlert={hideAlert}
      />
    </View>
  );
};

export default SeatMap;
