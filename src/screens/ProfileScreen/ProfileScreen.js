import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotificationMain, {
  CustomAlert,
} from "../../components/Notification/NotificationMain";

export default function ProfileScreen() {
  const { showAlert, modalVisible, message, hideAlert } = NotificationMain();

  return (
    <View style={styles.centeredView}>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => showAlert("Your message")}
      >
        <Text>Show Alert</Text>
      </TouchableOpacity>
      <CustomAlert
        modalVisible={modalVisible}
        message={message}
        hideAlert={hideAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
