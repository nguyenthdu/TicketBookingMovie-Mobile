import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../theme/theme";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "http://172.16.11.83:8080/api/movie/not-showed"
      );
      const data = await response.json();
      setMovies(data.content);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginHorizontal: 5,
        borderRadius: 12,
        height: 300,
        width: 170,
        backgroundColor: "#F9F2ED",
        overflow: "hidden",
      }}
      onPress={() => {
        navigation.navigate("MovieDetail", { movie: item });
      }}
    >
      <Image
        style={{
          height: 250,
          resizeMode: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        source={{ uri: item.imageLink }}
      />

      {/*     <LinearGradient
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0)"]}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        /> */}
      <Text
        numberOfLines={2} // Số dòng tối đa
        ellipsizeMode="tail" // Khi văn bản quá dài, hiển thị dấu "..." ở cuối
        style={{
          fontSize: SIZES.font1,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.White,
      }}
    >
      <View
        style={{
          marginTop: 30,
          marginLeft: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: COLORS.Orange,
          }}
        >
          Xin chào
        </Text>
        <Text
          style={{
            marginLeft: 8,
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.Orange,
          }}
        >
          Thanh Dư
        </Text>
      </View>
      <View
        style={{
          marginTop: 16,
          marginHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: COLORS.Orange,
          }}
        >
          Phim sắp chiếu
        </Text>
        <Text
          style={{
            marginLeft: 8,
            fontSize: 14,
            color: COLORS.Orange,
          }}
        >
          Xem thêm
        </Text>
      </View>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        style={{
          marginHorizontal: 16,
        }}
      />
    </View>
  );
};

export default HomeScreen;
