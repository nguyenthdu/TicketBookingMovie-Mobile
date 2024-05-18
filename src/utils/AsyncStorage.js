import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkUserDataInAsyncStorage = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (user !== null && accessToken !== null) {
      return { user, accessToken };
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error checking user data:", error);
    return null;
  }
};

export const removeUserDataInAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.log("Error removing user data:", error);
  }
};
