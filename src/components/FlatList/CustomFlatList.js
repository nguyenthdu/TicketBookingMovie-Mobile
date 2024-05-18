import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { COLORS } from "../../theme/theme";
import Genres from "../Genres";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      {movies.map((item, index) => {
        if (!item.imageLink) {
          return null;
        }
        const translateX = scrollX.interpolate({
          inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
          outputRange: [0, width],
        });
        return (
          <Animated.View
            key={item.id}
            style={{
              position: "absolute",
              width: translateX,
              height,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.imageLink }}
              style={{
                width,
                height: BACKDROP_HEIGHT,
                position: "absolute",
              }}
            />
          </Animated.View>
        );
      })}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

const CustomFlatList = ({ movies, scrollX, navigation }) => {
  const handleMoviePress = (movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  if (movies.length === 0) {
    return <Loading />;
  }

  const user = useSelector((state) => state.user.user);

  const handleMovieShowTime = (item) => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Vui lòng đăng nhập để xem thông tin chi tiết",
        visibilityTime: 2000,
        autoHide: true,
      });
      navigation.navigate("SignIn");
      return;
    }
    navigation.navigate("ShowTime", { movie: item });
  };

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.imageLink) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <TouchableOpacity
                onPress={() => handleMoviePress(item)}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: "center",
                    transform: [{ translateY }],
                    backgroundColor: "white",
                    borderRadius: 34,
                  }}
                >
                  <Image
                    source={{ uri: item.imageLink }}
                    style={styles.posterImage}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Genres genres={item.genres} />
                  <TouchableOpacity
                    onPress={() => handleMovieShowTime(item)}
                    style={{
                      backgroundColor: COLORS.Orange,
                      borderRadius: 24,
                      padding: 10,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="local-movies"
                      size={24}
                      color="white"
                    />
                    <Text
                      style={{
                        color: COLORS.White,
                        textAlign: "center",
                        fontSize: 16,
                        marginLeft: 5,
                      }}
                    >
                      Đặt vé ngay
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default CustomFlatList;
