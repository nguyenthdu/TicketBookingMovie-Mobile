import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import imagePromotionDefault from "../../assets/images/promotion.png";
import { fetchTypeSeat } from "../../services/ShowTimeAPI";
import { COLORS, FONTSIZE } from "../../theme/theme";
import {
  checkFoodPromotion,
  checkTicketPromotion,
  compareTypeSeat,
} from "../../utils/aboutSeat";
import { formatCurrency } from "../../utils/formatData";

const PromotionItem = ({ promotionBill, promotionSeats, promotionFoods }) => {
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [typeSeat, setTypeSeat] = useState(null);
  const [seatNamePromotion, setSeatNamePromotion] = useState(null);
  const [seatNameRequired, setSeatNameRequired] = useState(null);
  const [messageSeat, setMessageSeat] = useState(null);
  const [foodNamePromotion, setFoodNamePromotion] = useState(null);
  const [foodNameRequired, setFoodNameRequired] = useState(null);

  // fetch type seat để so sánh loại ghế
  useEffect(() => {
    getTypeSeat();
  }, []);

  const getTypeSeat = async () => {
    const resTypeSeat = await fetchTypeSeat();
    setTypeSeat(resTypeSeat);
  };

  useEffect(() => {
    if (promotionSeats?.code && typeSeat) {
      const promotion = compareTypeSeat(
        promotionSeats.promotionTicketDetailDto.typeSeatPromotion,
        typeSeat
      );
      setSeatNamePromotion(promotion);
      const required = compareTypeSeat(
        promotionSeats.promotionTicketDetailDto.typeSeatRequired,
        typeSeat
      );
      setSeatNameRequired(required);
    }
  }, [promotionSeats, typeSeat]);

  const openModal = (promotion) => {
    setSelectedPromotion(promotion);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPromotion(null);
    setModalVisible(false);
  };

  const renderPromotion = (promotion) => {
    var isChecked = true;
    if (promotion?.typePromotion === "TICKET") {
      isChecked = checkTicketPromotion(promotion, selectedSeats);
    }
    if (promotion?.typePromotion === "FOOD") {
      isChecked = checkFoodPromotion(promotion, selectedFoods);
    }

    return isChecked ? (
      <View style={styles.row} key={promotion.id}>
        <Text>{promotion.name}</Text>
        <TouchableOpacity onPress={() => openModal(promotion)}>
          <Text style={{ color: COLORS.LightBlue }}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  useEffect(() => {
    if (seatNameRequired && seatNamePromotion) {
      setMessageSeat(
        `Bạn được miễn phí ${promotionSeats?.promotionTicketDetailDto.quantityPromotion} ${seatNamePromotion} khi mua ${promotionSeats?.promotionTicketDetailDto.quantityRequired} ${seatNameRequired}.`
      );
    }
  }, [seatNameRequired, seatNamePromotion]);

  const message =
    selectedPromotion?.typePromotion === "TICKET"
      ? `Bạn được miễn phí ${selectedPromotion?.promotionTicketDetailDto.quantityPromotion} ${seatNamePromotion} khi mua ${selectedPromotion?.promotionTicketDetailDto.quantityRequired} ${seatNameRequired}.`
      : selectedPromotion?.typePromotion === "FOOD"
      ? `Chúc mừng bạn đã nhận được ưu đãi ${selectedPromotion?.promotionFoodDetailDto.quantityPromotion}x ${selectedPromotion?.promotionFoodDetailDto.foodPromotion.name} miễn phí khi mua ${selectedPromotion?.promotionFoodDetailDto.quantityRequired}x ${selectedPromotion?.promotionFoodDetailDto.foodRequired.name}.`
      : selectedPromotion?.typePromotion === "DISCOUNT"
      ? selectedPromotion?.promotionDiscountDetailDto?.typeDiscount ===
        "PERCENT"
        ? `Chúc mừng bạn đã nhận được ưu đãi giảm ${
            selectedPromotion?.promotionDiscountDetailDto.discountValue
          }% khi hóa đơn từ ${formatCurrency(
            selectedPromotion?.promotionDiscountDetailDto.minBillValue
          )}. Giảm tối đa ${formatCurrency(
            selectedPromotion?.promotionDiscountDetailDto.maxValue
          )}.`
        : `Chúc mừng bạn đã nhận được ưu đãi giảm trực tiếp ${formatCurrency(
            selectedPromotion?.promotionDiscountDetailDto.discountValue
          )} khi hóa đơn từ ${formatCurrency(
            selectedPromotion?.promotionDiscountDetailDto.minBillValue
          )}. Giảm tối đa ${formatCurrency(
            selectedPromotion?.promotionDiscountDetailDto.maxValue
          )}.`
      : "";
  return (
    <View>
      {promotionBill?.code && renderPromotion(promotionBill)}
      {promotionSeats?.code && renderPromotion(promotionSeats)}
      {promotionFoods.length > 0 && renderPromotion(promotionFoods)}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={
                selectedPromotion?.image
                  ? { uri: selectedPromotion.image }
                  : imagePromotionDefault
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
            />
            <View style={styles.content}>
              <Text style={styles.modalText}>Thông báo</Text>
              <ScrollView
                scrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <Text style={styles.message}>{message}</Text>
              </ScrollView>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.buttonClose]}
                  onPress={closeModal}
                >
                  <Text style={styles.textStyle}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PromotionItem;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    height: "35%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  footer: {
    width: "100%",
  },
  buttonClose: {
    backgroundColor: COLORS.Grey,
    padding: 10,
  },
  textStyle: {
    color: COLORS.Black,
    fontWeight: "400",
    textAlign: "center",
    fontSize: FONTSIZE.size_16,
    textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "500",
    fontSize: FONTSIZE.size_18,
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    // minHeight: "5%",
    flex: 1,
  },
  message: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: FONTSIZE.size_18,
  },
  icon: {
    color: COLORS.warning,
    fontSize: 65,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});
