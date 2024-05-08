import axios from "../utils/axios-custom";

export const fetchPromotionByBill = async (totalPrice) => {
  try {
    const response = await axios.get(
      `/api/promotion/line_discount/active?totalPrice=${totalPrice}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching promotion by bill:", error);
    return error;
  }
};

export const fetchPromotionByTicket = async (seats, showTimeId) => {
  const seatIds = seats.map((seat) => seat.id).join(","); // Chuyển đổi mảng thành chuỗi

  try {
    const response = await axios.get(
      `/api/promotion/line_ticket/active?seatId=${seatIds}&showTimeId=${showTimeId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching promotion by ticket:", error);
    return error;
  }
};

export const fetchPromotionByFood = async (foods, cinemaId) => {
  const foodIds = [];
  foods.forEach((food) => {
    for (let i = 0; i < food.quantity; i++) {
      foodIds.push(food.id);
    }
  });

  const foodIdsString = foodIds.join(",");

  try {
    const response = await axios.get(
      `/api/promotion/line_food/active?foodId=${foodIdsString}&cinemaId=${cinemaId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching promotion by food:", error);
    return error;
  }
};
