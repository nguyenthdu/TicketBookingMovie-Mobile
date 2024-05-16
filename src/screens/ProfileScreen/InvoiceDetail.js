import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Divider from "../../components/Divider/Divider";
import { getInvoiceDetail } from "../../services/invoice";
import { COLORS, FONTSIZE } from "../../theme/theme";
import { dateFormat, formatTime, getDayInfo } from "../../utils/formatData";

const { width, height } = Dimensions.get("window");

const InvoiceDetail = ({ navigation, route }) => {
  const { invoiceId } = route.params;
  console.log(invoiceId);

  const [invoiceDetail, setInvoiceDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (invoiceId) {
      fetchInvoiceDetail(invoiceId);
    }
  }, [invoiceId]);

  const fetchInvoiceDetail = async (invoiceId) => {
    try {
      const response = await getInvoiceDetail(invoiceId);
      if (response) {
        setInvoiceDetail(response);
      } else {
        console.log("Error fetching invoice detail");
        Toast.show({
          type: "error",
          text1: "Lỗi từ hệ thống, vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      console.error("Error fetching invoice detail:", error);
      Toast.show({
        type: "error",
        text1: "Có lỗi xảy ra khi tải thông tin hóa đơn",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderImageQrCode = (invoiceDetail) => {
    return (
      <View style={styles.qrCodeContainer}>
        <Image
          source={{ uri: invoiceDetail?.movieDto?.imageLink }}
          style={styles.movieImage}
        />
        <QRCode
          value={JSON.stringify(invoiceId)}
          size={width * 0.4}
          color="black"
          backgroundColor="white"
        />
      </View>
    );
  };

  const renderTicket = (invoiceDetail) => {
    const standardSeats = invoiceDetail.invoiceTicketDetailDtos.filter(
      (seat) => seat.seatType === "STANDARD"
    );

    const vipSeats = invoiceDetail.invoiceTicketDetailDtos.filter(
      (seat) => seat.seatType === "VIP"
    );

    const sweetBox = invoiceDetail.invoiceFoodDetailDtos.filter(
      (food) => food.foodType === "SWEETBOX"
    );

    return (
      <View style={styles.containerTicket}>
        <View style={{ backgroundColor: COLORS.White, padding: 10 }}>
          <View style={styles.invoiceView}>
            <Text style={styles.boldText}>Rạp: </Text>
            <Text>{invoiceDetail.cinemaDto.name}</Text>
          </View>
          <View style={styles.invoiceView}>
            <Text style={styles.boldText}>Phòng: </Text>
            <Text>{invoiceDetail.roomDto.name}</Text>
          </View>
          <View style={styles.invoiceView}>
            <Text style={styles.boldText}>Tên phim: </Text>
            <Text>{invoiceDetail.movieDto.name}</Text>
          </View>
          <View style={styles.invoiceView}>
            <Text style={styles.boldText}>Lịch chiếu: </Text>
            <Text style={{ fontSize: FONTSIZE.size_16 }}>
              {formatTime(invoiceDetail.showTimeDto.showTime)} -{" "}
              {getDayInfo(invoiceDetail.showTimeDto.showDate)},{" "}
              {dateFormat(invoiceDetail.showTimeDto.showDate)}
            </Text>
          </View>
        </View>
        <Text style={{ marginLeft: 15, marginTop: 10 }}>Chi tiết vé:</Text>
        <View style={{ backgroundColor: COLORS.White, padding: 10 }}>
          {standardSeats.length > 0 && (
            <View style={styles.invoiceView}>
              <Text style={styles.boldText}>Ghế thường:</Text>
              <Text style={{ fontSize: FONTSIZE.size_16 }}>
                {standardSeats.map((seat) => seat.seatName).join(", ")}
              </Text>
            </View>
          )}
          {vipSeats.length > 0 && (
            <View style={styles.invoiceView}>
              <Text style={styles.boldText}>Ghế VIP:</Text>
              <Text style={{ fontSize: FONTSIZE.size_16 }}>
                {vipSeats.map((seat) => seat.seatName).join(", ")}
              </Text>
            </View>
          )}
          {sweetBox.length > 0 && (
            <View style={styles.invoiceView}>
              <Text style={styles.boldText}>Combo:</Text>
              <Text style={{ fontSize: FONTSIZE.size_16 }}>
                {sweetBox.map((food) => food.foodName).join(", ")}
              </Text>
            </View>
          )}
        </View>
        <Text style={{ marginLeft: 15, marginTop: 10 }}>Chi tiết đồ ăn:</Text>
        <View style={{ backgroundColor: COLORS.White, padding: 10 }}>
          {invoiceDetail.invoiceFoodDetailDtos.length > 0 &&
            invoiceDetail.invoiceFoodDetailDtos.map((food, index) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={index}
              >
                <Text style={styles.boldText}>{food.foodName}</Text>
                <Text>Số lượng: {food.quantity}</Text>
              </View>
            ))}
        </View>
        <Text style={{ marginLeft: 15, marginTop: 10 }}>
          Khuyến mãi đã nhận được:
        </Text>
        <View style={{ backgroundColor: COLORS.White, padding: 10 }}>
          {invoiceDetail.promotionLineDtos &&
            invoiceDetail.promotionLineDtos.map((promotion) => (
              <Text style={styles.boldText}>{promotion.name}</Text>
            ))}
        </View>
      </View>
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>Lịch sử giao dịch</Text>
      </View>
      <Divider marginTop={1} lineWidth={1} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : invoiceDetail ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 / 2 }}>
              {renderImageQrCode(invoiceDetail)}
            </View>
            <Divider marginTop={10} lineWidth={1} />
            <ScrollView style={{ flex: 1 / 2 }}>
              <View style={{ flex: 1 }}>{renderTicket(invoiceDetail)}</View>
            </ScrollView>
          </View>
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerTicket: {
    marginTop: 10,
    backgroundColor: COLORS.LightGrey,
  },
  invoiceView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boldText: {
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.White,
  },
  titleStyle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  qrCodeContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: COLORS.White,
  },
  movieImage: {
    borderRadius: 10,
    width: width * 0.4,
    resizeMode: "contain",
    backgroundColor: COLORS.Pink,
  },
});
