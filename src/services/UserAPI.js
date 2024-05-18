import moment from "moment";
import axios from "../utils/axios-custom";

export const CallGetUserById = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log("error api get user by id: ", error.response.data.message);

    return error.response.data;
  }
};

export const CallSignUp = async (
  userName,
  email,
  gender,
  birthday,
  phoneNumber,
  password
) => {
  console.log(
    "CallSignUp",
    userName,
    email,
    gender,
    birthday,
    phoneNumber,
    password
  );

  try {
    const response = await axios.post(
      `/api/users?username=${userName}&email=${email}&gender=${
        gender === "Nam" ? "true" : "false"
      }&birthday=${birthday}&phone=${phoneNumber}&password=${password}`
    );
    return response.data;
  } catch (error) {
    console.log("error api đăng ký: ", error.response.data.message);

    return error;
  }
};

export const CallSignIn = async (email, password) => {
  try {
    const response = await axios.post(
      `/api/users/signin?email=${email}&password=${password}`
    );
    return response.data;
  } catch (error) {
    console.log("error đăng nhập api: ", error.response.data.message);

    return error.response.data;
  }
};

export const CallUpdateUser = async (
  userId,
  userName,
  phoneNumber,
  gender,
  dateOfBirth
) => {
  const formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");

  try {
    const response = await axios.put(
      `/api/users?id=${userId}&username=${userName}&gender=${
        gender === "Nam" ? "true" : "false"
      }&phone=${phoneNumber}&birthday=${formattedDate}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log("error api update user: ", error.response.data.message);
      return error.response.data;
    } else {
      console.log("error api update user: ", error.message);
      return { message: error.message };
    }
  }
};
