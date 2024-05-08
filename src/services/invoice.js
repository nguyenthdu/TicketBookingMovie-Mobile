import axios from "../utils/axios-custom";

export const createInvoice = async (
  showTimeId,
  seats,
  foods
  //emailUser
) => {
  const seatIds = seats.map((seat) => seat.id).join(",");
  const foodIds = foods
    .flatMap((food) => Array(food.quantity).fill(food.id))
    .join(",");

  console.log("invoice api: ", showTimeId, seatIds, foodIds);

  try {
    const response = await axios.post(
      `/api/invoice?showTimeId=${showTimeId}&seatIds=${seatIds}&foodIds=${foodIds}&emailUser=test@gmail.com&staffId=1&typePay=CASH`
    );
    return response.data;
  } catch (error) {
    console.log("Error creating invoice:", error.response.data.message);
    return error.response.data;
  }
};
