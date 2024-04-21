import axios from "../utils/axios-custom";

// API lấy danh sách tất cả rạp chiếu phim
export const fetchAllCinemas = async (location) => {
  try {
    const response = await axios.get(
      `/api/cinema?district=${location === null ? "" : location}`
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching all cinemas:", error);
    return error;
  }
};
