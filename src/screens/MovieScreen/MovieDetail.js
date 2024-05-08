import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OpenYoutubeLink from "../../components/OpenYoutubeLink";
import { COLORS } from "../../theme/theme";
import { dateFormat } from "../../utils/formatData";

const { width, height } = Dimensions.get("window");

export default function MovieDetail({ route, navigation }) {
  const { movie } = route.params;
  return (
    //log data
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.Black,
      }}
    >
      <ImageBackground
        style={{
          width: "100%",
          height: height * 0.7,
          overflow: "hidden",
        }}
        imageStyle={{
          resizeMode: "cover",
          flex: 1,
        }}
        source={{ uri: movie.imageLink }}
      >
        <TouchableOpacity
          style={{
            margin: 30,
            position: "absolute",
            zIndex: 1,
            padding: 10,
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "white",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <LinearGradient
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.9)", "rgba(0,0,0,0)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "60%",
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <TouchableOpacity
          style={{
            marginTop: 150,
            alignItems: "center",
          }}
        >
          <OpenYoutubeLink youtubeLink={movie.trailerLink} />
        </TouchableOpacity>
        {/* TODO: Nút đặt vé */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 70,
          }}
        >
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginHorizontal: 20,
              textAlign: "center",
              color: COLORS.White,
              fontFamily: "Roboto",
            }}
          >
            {movie.name}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.Orange,
              borderRadius: 5,
              marginTop: 10,
              height: 50,
              width: 150,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("ShowTime", { movie });
            }}
          >
            <MaterialIcons name="local-movies" size={24} color="white" />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                color: COLORS.White,
                fontFamily: "Roboto",
              }}
            >
              Đặt vé
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              marginHorizontal: 20,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <FlatList
              data={movie.genres}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              renderItem={({ item }) => (
                <View
                  style={{
                    //nền màu xám
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 12,
                    margin: 5,
                    height: 30,
                    width: 100,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    ellipsizeMode="tail"
                    style={{
                      color: COLORS.White,
                      fontFamily: "Roboto",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.White,
                fontFamily: "Roboto",
                fontSize: 18,
              }}
            >
              {movie.country}
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontFamily: "Roboto",
                fontSize: 18,
              }}
            >
              {movie.durationMinutes} phút
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <Text
          numberOfLines={4}
          ellipsizeMode="tail"
          style={{
            color: "#DFDFDE",
            fontFamily: "Roboto",
            fontSize: 16,
          }}
        >
          {movie.description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.White,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Đạo diễn:
          </Text>
          <Text
            style={{
              color: "#DFDFDE",
              fontSize: 16,
              marginLeft: 5,
            }}
          >
            {movie.director}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              color: COLORS.White,
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 5,
            }}
          >
            Diễn viên:
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: "70%" }}
          >
            <Text
              // numberOfLines={1}
              // ellipsizeMode="tail"
              style={{
                color: "#DFDFDE",
                fontSize: 16,
              }}
            >
              {movie.cast}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.White,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Nhà sản xuất:
          </Text>
          <Text
            style={{
              color: "#DFDFDE",
              fontSize: 16,
              marginLeft: 5,
            }}
          >
            {movie.producer}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.White,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Ngày ra mắt:
          </Text>
          <Text
            style={{
              color: "#DFDFDE",
              fontSize: 16,
              marginLeft: 5,
            }}
          >
            {dateFormat(movie.releaseDate)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
