import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Divider from "../../components/Divider/Divider";
import { getInvoicesByUserId } from "../../services/invoice";
import { COLORS } from "../../theme/theme"; // Ensure you have a COLORS object defined in your theme file
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import styles from "./HistoryStyle";

const HistoryInvoice = ({ navigation }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.user);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (user?.id) {
      fetchInvoices(user?.id);
    }
  }, []);

  const fetchInvoices = async (userId) => {
    try {
      const response = await getInvoicesByUserId(userId);
      setInvoices(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailInvoice = (invoiceId) => {
    navigation.navigate("InvoiceDetail", { invoiceId });
  };

  const renderInvoice = ({ item }) => (
    <TouchableOpacity
      style={styles.invoiceItem}
      onPress={() => handleDetailInvoice(item?.id)}
    >
      <View style={styles.invoiceView}>
        <Text style={styles.boldText}>Mã hóa đơn: </Text>
        <Text style={styles.invoiceText}>{item.code}</Text>
      </View>
      <View style={styles.invoiceView}>
        <Text style={styles.boldText}>Ngày hóa đơn: </Text>
        <Text>{formatDateTime(item.createdDate)}</Text>
      </View>
      <View style={styles.invoiceView}>
        <Text style={styles.boldText}>Tổng tiền: </Text>
        <Text>{formatCurrency(item.totalPrice)}</Text>
      </View>
      <View style={styles.invoiceView}>
        <Text style={styles.boldText}>Phim: </Text>
        <Text>{item.movieName}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.Primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error fetching invoices: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.White,
        }}
      >
        <TouchableOpacity onPress={() => handleGoBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.titleStyle]}>Lịch sử giao dịch</Text>
      </View>
      <Divider marginTop={1} lineWidth={1} />
      <Text
        style={[
          styles.invoiceText,
          { marginLeft: 10, marginTop: 10, marginBottom: 10 },
        ]}
      >
        <Text style={[styles.boldText, { color: COLORS.warning }]}>
          Lưu ý:{" "}
        </Text>
        Chỉ hiển thị 20 lịch sử giao dịch gần nhất
      </Text>
      <FlatList
        data={invoices}
        renderItem={renderInvoice}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.list]}
      />
    </SafeAreaView>
  );
};

export default HistoryInvoice;
