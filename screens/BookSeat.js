import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTSIZE } from "../theme/theme";
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

const Seat = ({ seatData, onPress }) => {
  const { name, status, type } = seatData;
  let backgroundColor = COLORS.White;
  let seatTextColor = COLORS.Black;

  if (status === 0) {
    backgroundColor = COLORS.DarkGrey; // Set background color for unavailable seats
    seatTextColor = COLORS.White;
  } else if (status === 2) {
    backgroundColor = COLORS.Orange; // Set background color for selected seats
    seatTextColor = COLORS.White;
  } else {
    backgroundColor = COLORS.White; // Set background color for available seats
    seatTextColor = COLORS.Black;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.seat,
        {
          backgroundColor,
          borderColor:
            type === "VIP"
              ? COLORS.Orange
              : type === "SWEETBOX"
              ? COLORS.Purple
              : COLORS.Grey,
          width: type === "SWEETBOX" ? 50 : width / 11 - 1,
        },
      ]}
    >
      <Text style={[styles.seatText, { color: seatTextColor }]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function BookSeat({ navigation }) {
  const [selectedSeats, setSelectedSeats] = React.useState([]);

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
    navigation.navigate("Food", { selectedSeats });
  };
  // Hàm phân chia mảng thành các mảng con có độ dài cho trước
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  return (
    <View style={styles.container}>
      {console.log(selectedSeats)}

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 1,
          marginTop: 20,
          borderBottomColor: COLORS.Grey,
        }}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text
          style={{
            flex: 1,
            fontSize: FONTSIZE.size_24,
            fontWeight: "bold",
            marginLeft: 10,
            textAlign: "center",
            color: COLORS.Orange,
          }}
        >
          Đặt vé
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: FONTSIZE.size_16,
          fontWeight: "bold",
          textAlign: "center",
          color: COLORS.Black,
          marginTop: 10,
        }}
      >
        Màn hình
      </Text>
      <View
        style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 16 }}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1.5,
              borderColor: COLORS.DarkGrey,
              width: 20,
              height: 20,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <Text>Ghế thường</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1.5,
              borderColor: COLORS.Orange,
              width: 20,
              height: 20,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <Text>Ghế vip</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1.5,
              borderColor: COLORS.Purple,
              width: 20,
              height: 20,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <Text>Ghế đôi</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginHorizontal: 16,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.DarkGrey,
              width: 20,
              height: 20,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <Text>Ghế đã bán</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.Orange,
              width: 20,
              height: 20,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <Text>Ghế đang chọn</Text>
        </View>
      </View>

      {/* TODO: bottom */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.Grey,
          marginHorizontal: 16,
          marginTop: 10,
        }}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 16,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          height: height / 6,
        }}
      >
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            alignItems: "center",
            width: width * 0.6,
          }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.size_20,
              fontWeight: "bold",
              color: COLORS.Black,
            }}
          >
            Ghế đã chọn
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {selectedSeats.map((seat) => (
              <Text
                key={seat}
                style={{
                  backgroundColor: COLORS.Orange,
                  padding: 5,
                  margin: 5,
                  color: COLORS.White,
                  fontSize: FONTSIZE.size_14,
                  borderRadius: 5,
                }}
              >
                {seat}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: COLORS.Grey,
            height: height / 6,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: width * 0.4,
          }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.size_20,
              fontWeight: "bold",
              color: COLORS.Black,
            }}
          >
            Tổng tiền
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: FONTSIZE.size_24,
              fontWeight: "bold",
              color: COLORS.Orange,
              flexWrap: "wrap",
            }}
          >
            {selectedSeats.length * 100000}
          </Text>
          <Text
            style={{
              fontSize: FONTSIZE.size_16,
              color: COLORS.Black,
            }}
          >
            VNĐ
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleBookSeat}
        style={{
          backgroundColor: COLORS.Orange,
          borderRadius: 24,
          marginHorizontal: 16,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  seat: {
    width: width / 11 - 1,
    height: width / 11 - 1,
    borderWidth: 2,
    borderColor: COLORS.Grey,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    borderRadius: 5,
  },
  seatText: {
    fontSize: FONTSIZE.size_14,
    fontWeight: "bold",
  },
});
