import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.radioButton}
          onPress={() => onSelect(option)}
        >
          <View style={styles.radioButtonCircle}>
            {selectedOption === option && (
              <View style={styles.radioButtonInnerCircle} />
            )}
          </View>
          <Text style={styles.radioButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioButtonCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  radioButtonText: {
    marginLeft: 10,
  },
});

export default RadioButton;
