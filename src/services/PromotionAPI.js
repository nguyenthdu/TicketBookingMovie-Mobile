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
