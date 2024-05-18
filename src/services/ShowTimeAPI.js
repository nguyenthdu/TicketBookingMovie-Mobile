import axios from "../utils/axios-custom";

// API lấy danh sách ngày chiếu của một phim
export const fetchDateShowTime = async (movieId, cinemaId) => {
  try {
    const response = await axios.get(
      `/api/showtime/dates?movieId=${movieId}&cinemaId=${cinemaId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dates show time:", error);
    return error;
  }
};

export const fetchShowTime = async (movieId, cinemaId, date) => {
  try {
    const response = await axios.get(
      `/api/showtime?movieId=${movieId}&cinemaId=${cinemaId}&date=${date}`
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching show time:", error);
    return error;
  }
};

// lấy danh sách ghế
export const fetchSeats = async (showTimeId) => {
  try {
    const response = await axios.get(`/api/showtime/seat/${showTimeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    return error;
  }
};

// lấy danh sách loại ghế
export const fetchTypeSeat = async () => {
  try {
    const response = await axios.get(`/api/typeSeat`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seat types:", error);
    return error;
  }
};

// check giữ ghế
export const callCheckHoldSeat = async (seats, showTimeId) => {
  const seatIds = seats.map((seat) => seat.id).join(",");

  try {
    const response = await axios.get(
      `/api/showtime/seat?seatIds=${seatIds}&showTimeId=${showTimeId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// giữ ghế
export const callHoldSeats = async (seats, showTimeId, status) => {
  const seatIds = seats.map((seat) => seat.id).join(",");

  try {
    const response = await axios.post(
      `/api/showtime/seat?seatIds=${seatIds}&showTimeId=${showTimeId}&status=${status}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
