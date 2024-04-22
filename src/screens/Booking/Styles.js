import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  seat: {
    width: width / 11 - 1,
    height: width / 11 - 1,
    borderWidth: 2,
    borderColor: COLORS.Grey,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    borderRadius: 5,
  },
  seatText: {
    fontSize: FONTSIZE.size_14,
    fontWeight: "bold",
  },
});
