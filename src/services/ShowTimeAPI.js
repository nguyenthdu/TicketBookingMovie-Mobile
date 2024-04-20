const API_SHOWTIME_URL = "http://172.16.11.83:8080/api/showtime";
const API_CINEMA_URL = "http://172.16.11.83:8080/api/cinema";
import axios from "../utils/axios-custom";

// API lấy danh sách ngày chiếu của một phim
export const fetchDateShowTime = async (movieId, cinemaId) => {
  try {
    const formData = new FormData();
    formData.append("movieId", movieId);
    formData.append("cinemaId", cinemaId);

    const requestOptions = {
      method: "GET",
      body: formData,
      redirect: "follow",
    };

    const response = await axios.get(`/api/showtime/dates`, requestOptions);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching showtime date:", error);
    throw error;
  }
};

// API lấy danh sách tất cả rạp chiếu phim
export const fetchAllCinemas = async () => {
  try {
    const formData = new FormData();
    formData.append("page", "");
    formData.append("size", "");
    formData.append("code", "");
    formData.append("name", "");
    formData.append("street", "");
    formData.append("ward", "");
    formData.append("district", "");
    formData.append("city", "");
    formData.append("nation", "");

    const requestOptions = {
      method: "GET",
      body: formData,
      redirect: "follow",
    };

    const response = await axios.get(`/api/cinema`, requestOptions);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    throw error;
  }
};
