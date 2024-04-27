import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import imageWarning from "../../assets/images/warning.png";
import BookingSummary from "../../components/Booking/BookingSummary";
import QuantitySelector from "../../components/Booking/QuantitySelector";
import NotificationPromotion from "../../components/Notification/NotificationPromotion";
import {
  doSetSelectedFoods,
  doSetSelectedPromotionFood,
} from "../../redux/booking/bookingSlice";
import { getAllFood } from "../../services/FoodAPI";
import { fetchPromotionByFood } from "../../services/PromotionAPI";
import { COLORS, FONTSIZE } from "../../theme/theme";
import { formatCurrency } from "../../utils/formatData";
import styles from "./Styles";

const { width, height } = Dimensions.get("window");

const Food = ({ route, navigation }) => {
  const { cinemaId } = route.params;
  const dispatch = useDispatch();
  const selectedFoods = useSelector((state) => state.booking.selectedFoods);
  const selectedPromotionFood = useSelector(
    (state) => state.booking.selectedPromotionFood
  );

  const [food, setFood] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State để điều khiển việc hiển thị NotificationPromotion
  const [promotion, setPromotion] = useState(null); // State để lưu promotion hiện tại

  // fetch promotion by food
  useEffect(() => {
    if (selectedFoods.length > 0 && cinemaId) {
      getPromotionByFood(selectedFoods, cinemaId);
    } else {
      dispatch(doSetSelectedPromotionFood({}));
    }
  }, [selectedFoods]);

  const getPromotionByFood = async (foods, cinemaId) => {
    const resPromotion = await fetchPromotionByFood(foods, cinemaId);
    console.log("resPromotion: ", resPromotion?.id);
    if (resPromotion) {
      if (resPromotion?.id !== selectedPromotionFood?.id) {
        dispatch(doSetSelectedPromotionFood(resPromotion));
        setPromotion(resPromotion); // Lưu promotion vào state
        setModalVisible(true); // Hiển thị NotificationPromotion
      }
    }
  };

  useEffect(() => {
    if (cinemaId) {
      fetchFood(cinemaId);
    }
  }, [cinemaId]);

  const fetchFood = async (cinemaId) => {
    const data = await getAllFood(cinemaId);
    const foodWithKeys = data.map((food, index) => ({
      ...food,
      idIndex: index.toString(),
    }));
    setFood(foodWithKeys);
  };

  const increaseQuantity = (item) => {
    const newSelectedFoods = [...selectedFoods];
    const index = newSelectedFoods.findIndex((food) => food.id === item.id);

    if (index !== -1) {
      newSelectedFoods[index] = {
        ...newSelectedFoods[index],
        quantity: (newSelectedFoods[index].quantity || 0) + 1,
      };
    } else {
      newSelectedFoods.push({
        ...item,
        quantity: 1,
      });
    }

    dispatch(doSetSelectedFoods(newSelectedFoods));
  };

  const decreaseQuantity = (item) => {
    const newSelectedFoods = [...selectedFoods];
    const index = newSelectedFoods.findIndex((food) => food.id === item.id);

    if (index !== -1) {
      const newQuantity = Math.max(
        (newSelectedFoods[index].quantity || 0) - 1,
        0
      );
      if (newQuantity === 0) {
        newSelectedFoods.splice(index, 1); // Xóa mặt hàng khỏi selectedFoods nếu số lượng giảm về 0
      } else {
        newSelectedFoods[index] = {
          ...newSelectedFoods[index],
          quantity: newQuantity,
        };
      }
      dispatch(doSetSelectedFoods(newSelectedFoods));
    }
  };

  const handleBookSeat = () => {
    navigation.navigate("Payment");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnGoBack}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.textStyle, styles.titleStyle]}>Chọn đồ ăn</Text>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 10,
          flex: 1,
        }}
      >
        {food.length === 0 ? (
          <Text>Hiện tại rạp chưa có tính năng chọn đồ ăn online!</Text>
        ) : (
          <FlatList
            data={food}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.DarkGrey,
                  //   justifyContent: "space-between",
                }}
              >
                <Image
                  source={item?.image ? { uri: item.image } : imageWarning}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    marginLeft: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_18,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_16,
                      fontWeight: "bold",
                      color: COLORS.DarkGrey,
                    }}
                  >
                    {item.size}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_16,
                      fontWeight: "bold",

                      color: COLORS.Orange,
                    }}
                  >
                    {formatCurrency(item.price)}
                  </Text>
                </View>
                {/* Tạo chọn số lượng */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    right: 0,
                    bottom: height * 0.05,
                  }}
                >
                  {item.price || item.quantity === 0 ? (
                    <QuantitySelector
                      quantity={
                        selectedFoods.find((food) => food.id === item.id)
                          ?.quantity || 0
                      }
                      decreaseQuantity={() => decreaseQuantity(item)}
                      increaseQuantity={() => increaseQuantity(item)}
                    />
                  ) : (
                    <Text style={[styles.textStyle, { color: COLORS.warning }]}>
                      Không có sẵn
                    </Text>
                  )}
                </View>
              </View>
            )}
          />
        )}
      </View>
      <Divider />
      <View style={{ flex: 2.3 / 6 }}>
        <BookingSummary />
        <TouchableOpacity
          onPress={() => handleBookSeat()}
          style={styles.btnContinue}
        >
          <Text style={styles.textBtnContinue}>Tiếp tục</Text>
        </TouchableOpacity>
        <NotificationPromotion
          promotion={promotion}
          modalVisible={modalVisible}
          handleClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
};

export default Food;
