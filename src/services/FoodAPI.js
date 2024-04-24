import axios from "../utils/axios-custom";

export const getAllFood = async () => {
  try {
    const response = await axios.get(`/api/food`);
    return response.data.content;
  } catch (error) {
    console.log("Error fetching food:", error);
    return error;
  }
};
