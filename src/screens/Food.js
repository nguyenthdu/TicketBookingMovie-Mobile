import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllFood } from "../services/FoodAPI";
import { COLORS, FONTSIZE } from "../theme/theme";
const { width, height } = Dimensions.get("window");
export default function Food({ route, navigation }) {
  const [food, setFood] = React.useState([]);
  const [selectedQuantities, setSelectedQuantities] = React.useState({});

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const data = await getAllFood();
        const foodWithKeys = data.map((food, index) => ({
          ...food,
          id: index.toString(),
        }));
        setFood(foodWithKeys);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };
    fetchFood();
  }, []);
  const increaseQuantity = (id) => {
    setSelectedQuantities((prevState) => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1,
    }));
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    setSelectedQuantities((prevState) => ({
      ...prevState,
      [id]: Math.max((prevState[id] || 0) - 1, 0),
    }));
  };

  const handleBookSeat = () => {
    navigation.navigate("Payment");
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
            marginLeft: 10,
            textAlign: "center",
            color: COLORS.Orange,
          }}
        >
          Chọn đồ ăn
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 10,
          flex: 1,
        }}
      >
        <FlatList
          data={food}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              onPress={() => {
                navigation.navigate("FoodDetail", {
                  food: item,
                });
              }}
            >
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
                  source={{ uri: item.image }}
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
                    {item.price}
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
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      borderWidth: 1,
                      borderColor: COLORS.Orange,
                      borderRadius: 5,
                      padding: 5,
                    }}
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <MaterialIcons
                      name="remove"
                      size={24}
                      color={COLORS.Orange}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{ fontSize: FONTSIZE.size_16, fontWeight: "bold" }}
                  >
                    {selectedQuantities[item.id] || 0}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: 10,
                      borderWidth: 1,
                      borderColor: COLORS.Orange,
                      borderRadius: 5,
                      padding: 5,
                    }}
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <MaterialIcons name="add" size={24} color={COLORS.Orange} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.Orange,
          padding: 10,
          borderRadius: 24,
          marginHorizontal: 16,
          alignItems: "center",
        }}
        onPress={() => {
          handleBookSeat();
        }}
      >
        <Text
          style={{
            color: COLORS.White,
            fontWeight: "bold",
            fontSize: FONTSIZE.size_18,
          }}
        >
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
