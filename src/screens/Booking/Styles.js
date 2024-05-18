import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  btnGoBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
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
  textBtnContinue: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    fontWeight: "bold",
  },
  // --------------------------------
  btnQuantity: {
    borderWidth: 1,
    borderColor: COLORS.Orange,
    borderRadius: 5,
    padding: 5,
  },
  textQuantity: {
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
  },
  // movie --------------------------
  textMovie: {
    fontSize: FONTSIZE.size_18,
    fontWeight: "bold",
  },
  cardMovie: {
    flex: 1 / 3,
    flexDirection: "row",
    backgroundColor: COLORS.White,
    padding: 10,
  },
  cardTransaction: {
    flex: 2 / 3,
    backgroundColor: COLORS.White,
    padding: 10,
    marginBottom: 10,
  },
  cardPayment: {
    flex: 1,
    backgroundColor: COLORS.White,
    padding: 10,
  },
  // --------------------------------
  countdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
