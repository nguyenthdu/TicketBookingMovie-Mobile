import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    height: "35%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  footer: {
    width: "100%",
  },
  buttonClose: {
    backgroundColor: COLORS.Grey,
    padding: 10,
  },
  textStyle: {
    color: COLORS.Black,
    fontWeight: "400",
    textAlign: "center",
    fontSize: FONTSIZE.size_16,
    textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "500",
    fontSize: FONTSIZE.size_18,
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    // minHeight: "5%",
    flex: 1,
  },
  message: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: FONTSIZE.size_18,
  },
  icon: {
    color: COLORS.warning,
    fontSize: 65,
  },
});
