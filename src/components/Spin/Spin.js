import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../../theme/theme";

const Spinner = () => {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền bóng mờ
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
