import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { COLORS } from "../../theme/theme";

const CustomDateInput = ({ placeholder, date, onChange, error }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    onChange(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <View style={styles.inputContainer}>
          <AntDesign
            name="calendar"
            size={24}
            color={COLORS.Black}
            style={styles.icon}
          />
          <Text
            style={[styles.input, { color: date ? null : COLORS.DarkGrey }]}
          >
            {date ? date.toLocaleDateString() : placeholder}
          </Text>
        </View>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        date={date || new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.DarkGrey,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: COLORS.Black,
    marginLeft: 8,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 8,
  },
});

export default CustomDateInput;
