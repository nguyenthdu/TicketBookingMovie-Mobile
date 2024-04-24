import axios from "axios";
import { baseUrl } from "./containUrl";

const instance = axios.create({
  baseURL: baseUrl,
  headers: { "X-Custom-Header": "foobar" },
});

// Add a request interceptor
// instance.interceptors.request.use(
//   async function (config) {
//     // Thêm logic để thêm token vào header của request
//     const accessToken = await AsyncStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   function (error) {
//     // Xử lý lỗi request
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// instance.interceptors.response.use(
//   function (response) {
//     // Nếu response thành công, trả về response nguyên thể
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     // Xử lý lỗi response
//     if (error.response.status === 401 && !originalRequest._retry) {
//       // Nếu mã lỗi là 401 (Unauthorized) và chưa có lần retry trước đó
//       originalRequest._retry = true;

//       // Lấy refresh token từ AsyncStorage
//       const refreshToken = await AsyncStorage.getItem("refreshToken");
//       if (refreshToken) {
//         // Gửi request mới để lấy access token mới từ refresh token
//         const response = await instance.post("/user/refresh-token", {
//           refreshToken,
//         });
//         const newAccessToken = response.data.accessToken;

//         // Lưu access token mới vào AsyncStorage
//         await AsyncStorage.setItem("accessToken", newAccessToken);

//         // Thực hiện lại request ban đầu với access token mới
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return instance(originalRequest);
//       } else {
//         // Nếu không có refresh token, chuyển hướng đến trang đăng nhập
//         // navigation.navigate("Login");
//         return Promise.reject(error);
//       }
//     }
//     // Trả về lỗi nếu không thực hiện được
//     return Promise.reject(error);
//   }
// );

export default instance;
