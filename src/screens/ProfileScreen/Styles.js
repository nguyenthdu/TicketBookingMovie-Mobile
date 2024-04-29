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
  // ============== SignUp ==============
  wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.White,
  },
  containerSign: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  titleStyle: {
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
    fontSize: FONTSIZE.size_24,
    color: COLORS.Black,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 10,
  },
  btnContainer: {
    backgroundColor: COLORS.White,
  },
  btn: {
    backgroundColor: COLORS.Orange,
    padding: 10,
    borderRadius: 24,
    alignItems: "center",
  },
  textBtn: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    fontWeight: "bold",
  },

  // --------------- SignIn ---------------
  forgetPassword: {
    color: COLORS.LightBlue,
    fontSize: FONTSIZE.size_16,
  },
  // --------------- FogetPassword --------
  textForgetPassword: {
    color: COLORS.Black,
    fontSize: FONTSIZE.size_16,
    textAlign: "center",
  },
});
