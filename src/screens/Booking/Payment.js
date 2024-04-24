import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTSIZE } from "../../theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  fetchMoviesShowing,
  fetchMoviesTrending,
  fetchMoviesUpcoming,
} from "../../services/MoiveAPI";
import Genres from "../../components/Genres";
import ShowTime from "./ShowTime";
const { width, height } = Dimensions.get("window");
const bookingDetail = {
  seat: [
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
  ],
  food: [
    {
      id: 1,
      name: "Bánh mì",
      imageLink:
        "https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png",
      price: 20000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Coca",
      price: 10000,
      imageLink:
        "https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "Coca",
      price: 10000,
      imageLink:
        "https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png",
      quantity: 1,
    },
    {
      id: 4,
      name: "Coca",
      price: 10000,
      imageLink:
        "https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png",
      quantity: 1,
    },
  ],
  cinema: {
    id: 1,
    name: "BHD",
    address: "Vincom Thảo Điền",
  },
  room: {
    id: 1,
    name: "Room 1",
    type: "VIP",
  },
  ShowTime: {
    id: 1,
    time: "10:00 AM",
    date: "2021-10-10",
  },
};
export default function Payment({ navigation }) {
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await fetchMoviesTrending();
        setMovie(data[0]);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, []);
  //xử lý thanh toán
  const handlePayment = () => {
    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.White,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 1,
          marginTop: 20,
          borderBottomColor: COLORS.Grey,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: FONTSIZE.size_24,
            fontWeight: "bold",
            textAlign: "center",
            color: COLORS.Orange,
          }}
        >
          Thanh toán
        </Text>
      </View>
      {/* TODO: Thông tin phim */}
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            height: height / 3,
            marginHorizontal: 16,
          }}
        >
          <Image
            source={{ uri: movie?.imageLink }}
            style={{
              width: width * 0.4,
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              marginLeft: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: FONTSIZE.size_20, fontWeight: "bold" }}>
              {movie?.name}
            </Text>
            <View style={styles.contentInfo}>
              <Text style={styles.textInfoLabel}>Thời lượng</Text>
              <Text style={styles.textInfo}>: {movie?.durationMinutes}</Text>
            </View>
            <View style={styles.contentInfo}>
              <Text style={styles.textInfoLabel}>Quốc gia</Text>
              <Text style={styles.textInfo}>: {movie?.country}</Text>
            </View>
            <View style={styles.contentInfo}>
              <Text numberOfLines={2} style={styles.textInfoLabel}>
                Đạo diễn
              </Text>
              <Text style={styles.textInfo}>: {movie?.director}</Text>
            </View>
            <View numberOfLines={4} style={styles.contentInfo}>
              <Text style={styles.textInfoLabel}>Diễn viên</Text>
              <Text style={styles.textInfo}>: {movie?.cast}</Text>
            </View>
            {/*  <View style={styles.contentInfo}>
            <Text style={styles.textInfoLabel}>Thể loại</Text>
            <Genres genres={movie?.genres} />
          </View> */}
            <View style={styles.contentInfo}>
              <Text style={styles.textInfoLabel}>Ngày chiếu</Text>
              <Text style={styles.textInfo}>: {movie?.releaseDate}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: "#F7F7F7",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.Grey,
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.size_20,
              fontWeight: "bold",
              textAlign: "center",
              color: COLORS.Black,
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.Grey,
            }}
          >
            Chi tiết hóa đơn
          </Text>
          <View style={styles.contentBookDetail}>
            <Text style={styles.textDetailLabel}>Têm rạp</Text>
            <Text style={styles.contentBookDetail}>
              {bookingDetail.cinema.name}
            </Text>
          </View>
          <View style={styles.contentBookDetail}>
            <Text style={styles.textDetailLabel}>Địa chỉ</Text>
            <Text style={styles.contentBookDetail}>
              {bookingDetail.cinema.address}
            </Text>
          </View>
          <View style={styles.contentBookDetail}>
            <Text style={styles.textDetailLabel}>Phòng</Text>
            <Text style={styles.contentBookDetail}>
              {bookingDetail.room.name}
            </Text>
          </View>
          <View style={styles.contentBookDetail}>
            <Text style={styles.textDetailLabel}>Loại phòng</Text>
            <Text style={styles.contentBookDetail}>
              {bookingDetail.room.type}
            </Text>
          </View>
          <View style={styles.contentBookDetail}>
            <Text style={styles.textDetailLabel}>Ngày chiếu</Text>
            <Text style={styles.contentBookDetail}>
              {bookingDetail.ShowTime.date}
            </Text>
          </View>
          <View style={styles.contentBookDetail}>
            <Text style={styles.textDetailLabel}>Giờ chiếu</Text>
            <Text style={styles.contentBookDetail}>
              {bookingDetail.ShowTime.time}
            </Text>
          </View>
          <View
            style={{
              //border nét đứt
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: COLORS.Grey,
              marginTop: 5,
            }}
          />

          {/* Hiển thị danh sách ghế */}
          <View style={styles.contentBookDetail}>
            <FlatList
              data={bookingDetail.seat}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Text style={styles.contentBookDetail}>{item.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: width * 0.5,
                    }}
                  >
                    <Text style={styles.contentBookDetail}>{item.type}</Text>
                    <Text style={styles.contentBookDetail}>{item.pirce}</Text>
                  </View>
                </View>
              )}
            />
          </View>
          <View
            style={{
              //border nét đứt
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: COLORS.Grey,
              marginTop: 5,
            }}
          />
          <View style={styles.contentBookDetail}>
            <FlatList
              data={bookingDetail.food}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.imageLink }}
                      style={{ width: 50, height: 50, marginRight: 10 }}
                    />
                    <Text style={styles.contentBookDetail}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: width * 0.4,
                    }}
                  >
                    <Text style={styles.contentBookDetail}>
                      {item.quantity}
                    </Text>
                    <Text style={styles.contentBookDetail}>
                      {item.price * item.quantity}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.size_18,
              textAlign: "center",
              color: COLORS.Black,
              marginTop: 10,
            }}
          >
            Tổng tiền
          </Text>
          <Text
            style={{
              fontSize: FONTSIZE.size_18,
              textAlign: "center",
              color: COLORS.Black,
              marginTop: 10,
            }}
          >
            10000
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.size_18,
              textAlign: "center",
              color: COLORS.Black,
            }}
          >
            Khuyến mãi
          </Text>
          <Text
            style={{
              fontSize: FONTSIZE.size_18,
              textAlign: "center",
              color: COLORS.Black,
            }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.size_20,
              textAlign: "center",
              color: COLORS.Orange,
              fontWeight: "bold",
            }}
          >
            Tổng cộng
          </Text>
          <Text
            style={{
              fontSize: FONTSIZE.size_20,
              textAlign: "center",
              color: COLORS.Orange,
              fontWeight: "bold",
            }}
          >
            10000
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.Orange,
            borderRadius: 24,
            padding: 10,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={handlePayment}
        >
          <Text
            style={{
              color: COLORS.White,
              textAlign: "center",
              fontSize: FONTSIZE.size_20,
            }}
          >
            Thanh toán
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentInfo: {
    flexDirection: "row",
    marginTop: 10,
  },

  textInfoLabel: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.DarkGrey,
    width: width / 4,
  },
  textInfo: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.DarkGrey,
  },
  contentBookDetail: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
  },
  textDetailLabel: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.DarkGrey,
  },
  textDetail: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.Black,
  },
});
