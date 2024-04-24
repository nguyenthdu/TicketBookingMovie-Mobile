const API_BASE_URL = "http://192.168.159.145:8080/api/food";

export const getAllFood = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching food:", error);
    throw error;
  }
};
