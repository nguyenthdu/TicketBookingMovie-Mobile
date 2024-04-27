import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles";

const NotificationMain = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (msg) => {
    setMessage(msg);
    setModalVisible(true);
  };

  const hideAlert = () => {
    setModalVisible(false);
  };

  return { showAlert, modalVisible, message, hideAlert };
};

export const CustomAlert = ({ modalVisible, message, hideAlert }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={hideAlert}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { height: "25%" }]}>
          <AntDesign name="warning" size={24} style={styles.icon} />
          <View style={styles.content}>
            <Text style={styles.modalText}>Thông báo</Text>
            <ScrollView
              scrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Text style={styles.message}>{message}</Text>
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.buttonClose]}
                onPress={hideAlert}
              >
                <Text style={styles.textStyle}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationMain;
