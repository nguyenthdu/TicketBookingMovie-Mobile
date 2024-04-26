import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import imagePromotionDefault from "../../assets/images/promotion.png";
import { formatCurrency } from "../../utils/formatData";
import styles from "./Styles";

const NotificationPromotion = ({ promotion, modalVisible, handleClose }) => {
  const message =
    promotion?.typePromotion === "TICKET"
      ? `Chúc mừng bạn đã nhận được ưu đãi ${promotion?.promotionTicketDetailDto.quantityPromotion} vé miễn phí khi mua ${promotion?.promotionTicketDetailDto.quantityRequired} vé.`
      : promotion?.typePromotion === "FOOD"
      ? `Chúc mừng bạn đã nhận được ưu đãi ${promotion?.promotionFoodDetailDto.quantityPromotion}x ${promotion?.promotionFoodDetailDto.foodPromotion.name} miễn phí khi mua ${promotion?.promotionFoodDetailDto.quantityRequired}x ${promotion?.promotionFoodDetailDto.foodRequired.name}.`
      : promotion?.typePromotion === "DISCOUNT"
      ? promotion?.promotionDiscountDetailDto?.typeDiscount === "PERCENT"
        ? `Chúc mừng bạn đã nhận được ưu đãi giảm ${
            promotion?.promotionDiscountDetailDto.discountValue
          }% khi hóa đơn từ ${formatCurrency(
            promotion?.promotionDiscountDetailDto.minBillValue
          )}. Giảm tối đa ${formatCurrency(
            promotion?.promotionDiscountDetailDto.maxValue
          )}.`
        : `Chúc mừng bạn đã nhận được ưu đãi giảm trực tiếp ${formatCurrency(
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
