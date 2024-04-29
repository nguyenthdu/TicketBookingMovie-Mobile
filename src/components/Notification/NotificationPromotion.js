import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import imagePromotionDefault from "../../assets/images/promotion.png";
import { fetchFoodById } from "../../services/FoodAPI";
import { fetchTypeSeat } from "../../services/ShowTimeAPI";
import { compareTypeSeat } from "../../utils/aboutSeat";
import { formatCurrency } from "../../utils/formatData";
import styles from "./Styles";

const NotificationPromotion = ({ promotion, modalVisible, handleClose }) => {
  const [typeSeat, setTypeSeat] = useState(null);
  const [seatNamePromotion, setSeatNamePromotion] = useState(null);
  const [seatNameRequired, setSeatNameRequired] = useState(null);
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
    if (promotion?.promotionTicketDetailDto && typeSeat) {
      const seatPromotion = compareTypeSeat(
        promotion.promotionTicketDetailDto.typeSeatPromotion,
        typeSeat
      );
      setSeatNamePromotion(seatPromotion);
      const required = compareTypeSeat(
        promotion.promotionTicketDetailDto.typeSeatRequired,
        typeSeat
      );
      setSeatNameRequired(required);
    }
  }, [promotion, typeSeat]);

  useEffect(() => {
    if (promotion?.promotionFoodDetailDto) {
      getNameFoodRequire(promotion.promotionFoodDetailDto.foodRequired);
      getNameFoodPromotion(promotion.promotionFoodDetailDto.foodPromotion);
    }
  }, [promotion]);

  const getNameFoodRequire = async (foodId) => {
    const res = await fetchFoodById(foodId);
    setFoodNameRequired(res.name);
  };
  const getNameFoodPromotion = async (foodId) => {
    const res = await fetchFoodById(foodId);
    setFoodNamePromotion(res.name);
  };

  const message =
    promotion?.typePromotion === "TICKET"
      ? `Bạn sẽ được miễn phí ${promotion?.promotionTicketDetailDto.quantityPromotion} ${seatNamePromotion} khi mua ${promotion?.promotionTicketDetailDto.quantityRequired} ${seatNameRequired}.`
      : promotion?.typePromotion === "FOOD"
      ? `Bạn sẽ được miễn phí ${promotion?.promotionFoodDetailDto.quantityPromotion} ${foodNamePromotion} khi mua ${promotion?.promotionFoodDetailDto.quantityRequired} ${foodNameRequired}.`
      : promotion?.typePromotion === "DISCOUNT"
      ? promotion?.promotionDiscountDetailDto?.typeDiscount === "PERCENT"
        ? `Bạn được ưu đãi giảm ${
            promotion?.promotionDiscountDetailDto.discountValue
          }% khi hóa đơn từ ${formatCurrency(
            promotion?.promotionDiscountDetailDto.minBillValue
          )}. Giảm tối đa ${formatCurrency(
            promotion?.promotionDiscountDetailDto.maxValue
          )}.`
        : `Bạn được ưu đãi giảm trực tiếp ${formatCurrency(
            promotion?.promotionDiscountDetailDto.discountValue
          )} khi hóa đơn từ ${formatCurrency(
            promotion?.promotionDiscountDetailDto.minBillValue
          )}. Giảm tối đa ${formatCurrency(
            promotion?.promotionDiscountDetailDto.maxValue
          )}.`
      : "";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={
              promotion?.image
                ? { uri: promotion.image }
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
                onPress={handleClose}
              >
                <Text style={styles.textStyle}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationPromotion;
