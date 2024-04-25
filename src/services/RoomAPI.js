import axios from "../utils/axios-custom";

export const callFetchRoomById = async (id) => {
  try {
    const response = await axios.get(`/api/room/${id}`);
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};
