import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/theme";

export default function Genres({ genres }) {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        return (
          <View key={genre.id} style={styles.genre}>
            <Text style={styles.genreText}>{genre.name}</Text>
            {/* Sử dụng trường name thay vì genre */}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: COLORS.Orange,
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    color: COLORS.Orange,
    fontSize: 12,
  },
});
