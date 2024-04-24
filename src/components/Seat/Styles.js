import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../theme/theme";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  seat: {
    width: width / 23 - 1,
    height: width / 23 - 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    borderRadius: 5,
  },
  seatText: {
    fontSize: 6,
    fontWeight: "bold",
  },
  rowSeat: {
    flexDirection: "row",
  },
});
