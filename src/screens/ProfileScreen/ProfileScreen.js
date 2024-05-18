import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { React } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../../components/Divider/Divider";
import { doSetIsLogged } from "../../redux/isloggedIn/isloggedSlice";
import { doSetUser } from "../../redux/user/userSlice";
import { COLORS } from "../../theme/theme";
import { removeUserDataInAsyncStorage } from "../../utils/AsyncStorage";
import styles from "./Styles";

const data = [
  { id: 1, title: "Thông tin về rạp chiếu phim" },
  { id: 2, title: "Điều khoản sử dụng" },
  { id: 3, title: "Câu hỏi thường gặp" },
];

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const user = useSelector((state) => state.user.user);

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text style={{ marginLeft: 10, flex: 1 }}>{item.title}</Text>
          <AntDesign name="right" size={12} color="black" />
        </TouchableOpacity>
        {index !== data.length - 1 && <Divider marginTop={1} lineWidth={1} />}
      </>
    );
  };

  const handleUpdateProfile = () => {
    navigation.navigate("UpdateUser");
  };

  const handleTransactionHistory = () => {
    navigation.navigate("HistoryInvoice");
  };

  const handleLogout = async () => {
    console.log("Đăng xuất");
    // xóa thông tin user và token trong AsyncStorage
    await removeUserDataInAsyncStorage();
    dispatch(doSetUser(null));
    dispatch(doSetIsLogged(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ alignItems: "flex-start", paddingHorizontal: 10 }]}>
        <Text style={[styles.textTitle]}>Tài khoản</Text>
      </View>
      <Divider marginTop={1} lineWidth={1} />
      <View style={styles.mainContainer}>
        {isLogged ? (
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfo}>
              <Image
                source={require("../../assets/images/avatarDefault.png")}
                style={styles.avatar}
              />
              <Text style={styles.userName}>{user?.username}</Text>
            </View>
            <View style={styles.btnLoggedContainer}>
              <TouchableOpacity
                onPress={handleUpdateProfile}
                style={styles.buttonLogged}
              >
                <AntDesign name="edit" size={24} color="white" />
                <Text style={styles.buttonLoggedText}>Thông tin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTransactionHistory}
                style={styles.buttonLogged}
              >
                <FontAwesome name="history" size={24} color="white" />
                <Text style={styles.buttonLoggedText}>Giao dịch</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.expenseLoggedContainer}>
              <ExpenseSlider />
            </View> */}
          </View>
        ) : (
          <View style={[styles.main, styles.main1]}>
            <View style={styles.registrationContainer}>
              <Image
                source={require("../../assets/images/infinity.png")}
                style={styles.logo}
              />
              <Text style={styles.registrationText}>
                Đăng ký thành viên InfinityCine để nhận ưu đãi đặc biệt!
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => handleSignUp()}
                style={[styles.button, { backgroundColor: COLORS.Orange }]}
              >
                <Text style={styles.buttonText}>Đăng ký</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSignIn()}
                style={[
                  styles.button,
                  { borderColor: COLORS.Orange, borderWidth: 1 },
                ]}
              >
                <Text style={[styles.buttonText, { color: COLORS.Orange }]}>
                  Đăng Nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[styles.main, styles.main2]}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Chỉ định một phương thức để tạo ra key duy nhất cho mỗi mục trong danh sách
          />
        </View>
        {isLogged && (
          <View style={styles.btnLogoutLoggedContainer}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.buttonLoggedLogout}
            >
              <Text style={styles.buttonLogoutLoggedText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
