import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: "column",
  },
  seatSelected: {
    flexDirection: "row",
    marginTop: 10,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calculateTotal: {
    flexDirection: "row",
    marginTop: 10,
  },
  textStyle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: "bold",
    color: COLORS.Black,
  },
  gapStyle: {
    marginRight: 5,
  },
});
