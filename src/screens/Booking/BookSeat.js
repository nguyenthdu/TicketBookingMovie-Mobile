import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookingSummary from "../../components/Booking/BookingSummary";
import Divider from "../../components/Divider/Divider";
import Seat from "../../components/Seat/Seat";
import SeatOption from "../../components/Seat/SeatOption";
import { fetchSeats } from "../../services/ShowTimeAPI";
import { COLORS, FONTSIZE } from "../../theme/theme";
import styles from "./Styles";
const { width, height } = Dimensions.get("window");

//data seat
const data = [
  {
    id: 1,
    name: "A01",
    row: 1,
    col: 1,
    pirce: 100000,
    status: 1,
    type: "VIP",
  },
  {
    id: 2,
    name: "A02",
    row: 1,
    col: 2,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 3,
    name: "A03",
    row: 1,
    col: 3,
    pirce: 100000,
    status: 1,
    type: "VIP",
  },
  {
    id: 4,
    name: "A04",
    row: 1,
    col: 4,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 5,
    name: "A05",
    row: 1,
    col: 5,
    pirce: 100000,
    status: 1,
    type: "VIP",
  },
  {
    id: 6,
    name: "A06",
    row: 1,
    col: 6,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 7,
    name: "A07",
    row: 1,
    col: 7,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 8,
    name: "A08",
    row: 1,
    col: 8,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 9,
    name: "A09",
    row: 1,
    col: 9,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 10,
    name: "A10",
    row: 1,
    col: 10,
    pirce: 100000,
    status: 0,
    type: "STANDARD",
  },
  {
    id: 11,
    name: "A11",
    row: 1,
    col: 11,
    pirce: 100000,
    status: 0,
    type: "STANDARD",
  },
  {
    id: 12,
    name: "B01",
    row: 2,
    col: 1,
    pirce: 100000,
    status: 1,
    type: "VIP",
  },
  {
    id: 13,
    name: "B02",
    row: 2,
    col: 2,
    pirce: 100000,
    status: 1,
    type: "VIP",
  },
  {
    id: 14,
    name: "B03",
    row: 2,
    col: 3,
    pirce: 100000,
    status: 0,
    type: "STANDARD",
  },
  {
    id: 15,
    name: "B04",
    row: 2,
    col: 4,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 16,
    name: "B05",
    row: 2,
    col: 5,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 17,
    name: "B06",
    row: 2,
    col: 6,
    pirce: 100000,
    status: 1,
    type: "VIP",
  },
  {
    id: 18,
    name: "B07",
    row: 2,
    col: 7,
    pirce: 100000,
    status: 1,
    type: "STANDARD",
  },
  {
    id: 19,
    name: "B08",
    row: 2,
    col: 8,
    pirce: 100000,
    status: 1,
    type: "SWEETBOX",
  },
  {
    id: 20,
    name: "B09",
    row: 2,
    col: 9,
    pirce: 100000,
    status: 0,
    type: "SWEETBOX",
  },
  {
    id: 21,
    name: "B10",
    row: 2,
    col: 10,
    pirce: 100000,
    status: 0,
    type: "SWEETBOX",
  },
  {
    id: 22,
    name: "B11",
    row: 2,
    col: 11,
    pirce: 100000,
    status: 0,
    type: "SWEETBOX",
  },
];

export default function BookSeat({ navigation, route }) {
  const { isFocusTime } = route.params;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState([]);

  useEffect(() => {
    if (isFocusTime) {
      fetchSeatData(isFocusTime.id);
    }
  }, [isFocusTime]);

  const fetchSeatData = async (id) => {
    const resSeatData = await fetchSeats(id);
    setSeatData(resSeatData);
    console.log("check seat: ", resSeatData[0]);
  };

  const renderSeat = ({ item }) => {
    const { id, name, status, type } = item;

    return (
      <Seat
        key={id}
        seatData={item}
        onPress={() => {
          if (status === 1) {
            if (selectedSeats.includes(name)) {
              setSelectedSeats(selectedSeats.filter((seat) => seat !== name));
            } else {
              setSelectedSeats([...selectedSeats, name]);
            }
          }
        }}
      />
    );
  };

  //handle book seat
  const handleBookSeat = () => {
    navigation.navigate("Food", {});
  };

  // Hàm phân chia mảng thành các mảng con có độ dài cho trước
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
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
      {/* render danh sách ghế */}
      <View
        style={{
          flex: 4.5 / 6,
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <FlatList
          data={chunkArray(data, 8)}
          style={{ height: height / 2, width: width - 32 }}
          keyExtractor={(dataChunk, index) => index.toString()}
          renderItem={({ item: dataChunk }) => (
            <FlatList
              style={{
                alignItems: "center",
              }}
              data={dataChunk}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSeat}
              numColumns={11}
            />
          )}
          numColumns={1}
        />
      </View>
      <Divider />
      {/* Giải thích loại ghế */}
      <View style={{ flex: 0.7 / 6 }}>
        <View style={styles.SeatOptionContainer}>
          <SeatOption type="bd" color={COLORS.DarkGrey} label="Ghế thường" />
          <SeatOption type="bd" color={COLORS.Orange} label="Ghế vip" />
          <SeatOption type="bd" color={COLORS.Purple} label="Ghế đôi" />
        </View>
        <View style={styles.SeatOptionContainer}>
          <SeatOption type="bgc" color={COLORS.DarkGrey} label="Ghế đã bán" />
          <SeatOption type="bgc" color={COLORS.Orange} label="Ghế đang chọn" />
        </View>
      </View>
      {/* hiện danh sách ghế đã chọn */}
      <Divider />
      <View style={{ flex: 1.8 / 6 }}>
        <BookingSummary selectedSeats={selectedSeats} selectedFoods={[]} />
        <TouchableOpacity onPress={handleBookSeat} style={styles.btnContinue}>
          <Text
            style={{
              color: COLORS.White,
              fontSize: FONTSIZE.size_20,
            }}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
