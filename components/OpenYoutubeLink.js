import React from "react";
import { TouchableOpacity, Linking, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "../theme/theme";
const OpenYoutubeLink = ({ youtubeLink }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(youtubeLink);
    if (supported) {
      await Linking.openURL(youtubeLink);
    } else {
      console.error("Don't know how to open URI: " + youtubeLink);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialIcons
        name="play-circle-filled"
        size={80}
        color={COLORS.Orange}
      />
    </TouchableOpacity>
  );
};

export default OpenYoutubeLink;
