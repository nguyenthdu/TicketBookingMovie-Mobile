import AsyncStorage from "@react-native-async-storage/async-storage"; // make sure to import AsyncStorage correctly
import axios from "axios";
import { baseUrl } from "./containUrl";

const instance = axios.create({
  baseURL: baseUrl,
  headers: { "X-Custom-Header": "foobar" },
});

// Thêm một interceptor để tự động thêm token vào mỗi lần gọi API
instance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
