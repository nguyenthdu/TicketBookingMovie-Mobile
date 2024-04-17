import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { COLORS, SIZES } from "../theme/theme";
import CustomFlatList from "../components/CustomFlatList";
import { MaterialIcons } from "@expo/vector-icons";

import {
  fetchMoviesShowing,
  fetchMoviesTrending,
  fetchMoviesUpcoming,
} from "../api/MoiveAPI";
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [moviesTrending, setMoviesTrending] = React.useState([]);
  const [moviesUpcoming, setMoviesUpcoming] = React.useState([]);
  const [moviesShowing, setMoviesShowing] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingData = await fetchMoviesTrending();
        const moviesWithKeys = trendingData.map((movie, index) => ({
          ...movie,
          id: index.toString(),
        }));
        const moviesWithEmptyItems = [
          { id: "empty-left" },
          ...moviesWithKeys,
          { id: "empty-right" },
        ];
        setMoviesTrending(moviesWithEmptyItems);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    const fetchOtherMovies = async () => {
      try {
        const upcomingData = await fetchMoviesUpcoming();
        const showingData = await fetchMoviesShowing();
        const moviesUpcomingWithKeys = upcomingData.map((movie, index) => ({
          ...movie,
          id: index.toString(),
        }));
        const moviesShowingWithKeys = showingData.map((movie, index) => ({
          ...movie,
          id: index.toString(),
        }));
        setMoviesUpcoming(moviesUpcomingWithKeys);
        setMoviesShowing(moviesShowingWithKeys);
      } catch (error) {
        console.error("Error fetching other movies:", error);
      }
    };

    fetchTrendingMovies();
    fetchOtherMovies();
  }, []);

  // Render your UI here...

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          height: height * 0.8,
          width,
        }}
      >
        <CustomFlatList
          movies={moviesTrending}
          scrollX={scrollX}
          navigation={navigation}
        />
      </View>
      <View style={styles.upcomingMoviesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Phim đang chiếu</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MoviesShowing");
            }}
          >
            <Text style={styles.seeMoreText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={moviesShowing}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MovieDetail", { movie: item });
                }}
              >
                <Image
                  style={styles.movieImage}
                  source={{ uri: item.imageLink }}
                />
                <Text style={styles.movieName} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ShowTime", { movie: item });
                }}
                style={{
                  backgroundColor: COLORS.Orange,
                  borderRadius: 24,
                  marginHorizontal: 10,
                  marginTop: 5,
                  padding: 8,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="local-movies" size={24} color="white" />
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
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
      <View style={styles.upcomingMoviesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Phim sắp chiếu</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MoviesUpcoming");
            }}
          >
            <Text style={styles.seeMoreText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={moviesUpcoming}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MovieDetail", { movie: item });
                }}
              >
                <Image
                  style={styles.movieImage}
                  source={{ uri: item.imageLink }}
                />
                <Text style={styles.movieName} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ShowTime", { movie: item });
                }}
                style={{
                  backgroundColor: COLORS.Orange,
                  borderRadius: 24,
                  marginHorizontal: 10,
                  marginTop: 5,
                  padding: 8,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="local-movies" size={24} color="white" />
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
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  upcomingMoviesSection: {
    marginTop: 16,
    backgroundColor: COLORS.White,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.Black,
    fontWeight: "bold",
  },
  seeMoreText: {
    fontSize: 14,
    color: COLORS.Orange,
  },
  movieItem: {
    marginRight: 8,
    width: 170,
  },
  movieImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 12,
  },
  movieName: {
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 18,
  },
});

export default HomeScreen;
