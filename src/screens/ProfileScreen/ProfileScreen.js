import { AntDesign } from "@expo/vector-icons";
import { React } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Divider from "../../components/Divider/Divider";
import { COLORS } from "../../theme/theme";
import styles from "./Styles";

const data = [
  { id: 1, title: "Thông tin về rạp chiếu phim" },
  { id: 2, title: "Điều khoản sử dụng" },
  { id: 3, title: "Câu hỏi thường gặp" },
];

export default function ProfileScreen() {
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ alignItems: "flex-start", paddingHorizontal: 10 }]}>
        <Text style={[styles.textTitle]}>Tài khoản</Text>
      </View>
      <Divider marginTop={1} lineWidth={1} />
      <View style={styles.mainContainer}>
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
              style={[styles.button, { backgroundColor: COLORS.Orange }]}
            >
              <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
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

        <View style={[styles.main, styles.main2]}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Chỉ định một phương thức để tạo ra key duy nhất cho mỗi mục trong danh sách
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
