import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  textTitle: {
    fontSize: FONTSIZE.size_24,
    fontWeight: "500",
  },
  mainContainer: {
    gap: 10,
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.DarkGrey,
  },
  main: {
    flex: 1 / 2,
  },
  main1: {
    alignItems: "center",
    backgroundColor: COLORS.White,
  },
  registrationContainer: {
    width: "70%",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginRight: 20,
  },
  registrationText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 10,
    minWidth: 100,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  main2: {
    backgroundColor: COLORS.White,
  },
});
