import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  btnGoBack: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: COLORS.Grey,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  titleStyle: {
    flex: 1,
    fontSize: FONTSIZE.size_24,
    marginLeft: 10,
    color: COLORS.Orange,
  },
  textScreen: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.Black,
    marginTop: 10,
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
  // ...............................................
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Grey,
    marginHorizontal: 16,
    marginTop: 10,
  },
  SeatOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    marginHorizontal: 16,
  },
  btnContinue: {
    backgroundColor: COLORS.Orange,
    borderRadius: 24,
    marginHorizontal: 16,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
