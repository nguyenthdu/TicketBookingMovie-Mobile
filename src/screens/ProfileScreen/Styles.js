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
  userInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.White,
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
  // --------------- Logged --------
  avatar: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: COLORS.Black,
    borderRadius: 50,
  },
  userInfoContainer: {
    flex: 2 / 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.White,
  },
  userInfo: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btnLoggedContainer: {
    width: "100%",
    flex: 1 / 3,
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  userName: {
    fontSize: FONTSIZE.size_20,
    fontWeight: "bold",
    marginTop: 10,
    color: COLORS.Black,
  },
  buttonLogged: {
    backgroundColor: COLORS.Orange,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  buttonLoggedText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
  },
  expenseLoggedContainer: {
    marginTop: 10,
    flex: 1 / 2,
    width: "100%",
    backgroundColor: COLORS.White,
  },
  buttonLoggedLogout: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonLogoutLoggedText: {
    color: COLORS.Orange,
    fontWeight: "400",
    fontSize: FONTSIZE.size_20,
  },
  btnLogoutLoggedContainer: {
    width: "100%",
    flex: 1 / 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.White,
    marginBottom: 20,
  },
  // --------------- UpdateUser --------
  innerUpdate: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 10,
    width: "100%",
  },
  userInfoUpdate: {
    alignItems: "center",
    justifyContent: "center",
  },
});
