import axios from "../utils/axios-custom";

export const createInvoice = async (showTimeId, seats, foods, emailUser) => {
  const seatIds = seats.map((seat) => seat.id).join(",");
  const foodIds = foods
    .flatMap((food) => Array(food.quantity).fill(food.id))
    .join(",");

  try {
    const response = await axios.post(
      `/api/invoice?showTimeId=${showTimeId}&seatIds=${seatIds}&foodIds=${foodIds}&emailUser=${emailUser}&staffId=1&typePay=CASH`
    );
    return response.data;
  } catch (error) {
    console.log("Error creating invoice:", error.response.data.message);
    return error.response.data;
  }
};

export const createInvoiceVnPay = async (
  amount,
  showTimeId,
  seats,
  foods,
  emailUser
) => {
  const seatIds = seats.map((seat) => seat.id).join(",");
  const foodIds = foods
    .flatMap((food) => Array(food.quantity).fill(food.id))
    .join(",");

  console.log("invoice api: ", showTimeId, seatIds, foodIds);

  try {
    const response = await axios.post(
      `/api/invoice/vnpay?amount=${amount}&showTimeId=${showTimeId}&seatIds=${seatIds}&foodIds=${foodIds}&emailUser=${emailUser}&staffId=1`
    );
    return response.data;
  } catch (error) {
    console.log("Error creating invoice:", error.response.data.message);
    return error.response.data;
  }
};

export const verifyPayment = async (queryParams) => {
  try {
    const response = await axios.get(
      `/api/invoice/vnpay-payment-return?${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.log("Error verifying payment:", error.response.data.message);
    return error.response.data;
  }
};

export const getInvoicesByUserId = async (userId) => {
  try {
    const response = await axios.get(`/api/invoice?userId=${userId}`);
    return response.data.content;
  } catch (error) {
    console.log("Error fetching invoices:", error.response.data.message);
    return error.response.data;
  }
};

export const getInvoiceDetail = async (invoiceId) => {
  try {
    const response = await axios.get(`/api/invoice/detail/${invoiceId}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching invoice detail:", error.response.data.message);
    return error.response.data;
  }
};
