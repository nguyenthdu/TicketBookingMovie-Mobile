import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";

export default StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
  titleStyle: {
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
    fontSize: FONTSIZE.size_24,
    color: COLORS.Black,
  },
  invoiceView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: COLORS.White,
    padding: 5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    width: "100%",
    flexGrow: 1,
    padding: 10,
    backgroundColor: COLORS.LightGrey,
  },
  invoiceItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.DarkGrey,
    backgroundColor: COLORS.White,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
  invoiceText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
  },
});
