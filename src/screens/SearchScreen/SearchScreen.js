import React, { useEffect } from "react";
import { Animated, SafeAreaView, StyleSheet } from "react-native";
import CustomFlatList from "../../components/FlatList/CustomFlatList";
import { baseUrl } from "../../utils/containUrl";

export default function SearchScreen() {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/movie/upcoming`);
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetchMovies();
      // Thêm key cho mỗi phần tử trong mảng movies
      const moviesWithKeys = moviesData.map((movie, index) => ({
        ...movie,
        id: index.toString(), // Sử dụng index như key
      }));
      // Thêm các phần tử "empty-left" và "empty-right" vào mảng movies
      const moviesWithEmptyItems = [
        { id: "empty-left" },
        ...moviesWithKeys,
        { id: "empty-right" },
      ];
      setMovies(moviesWithEmptyItems);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList movies={movies} scrollX={scrollX} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
