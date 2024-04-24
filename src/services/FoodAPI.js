import axios from "../utils/axios-custom";

export const getAllFood = async (cinemaId) => {
  try {
    const response = await axios.get(`/api/food?cinemaId=${cinemaId}`);
    return response.data.content;
  } catch (error) {
    console.log("Error fetching food:", error);
    return error;
  }
};
