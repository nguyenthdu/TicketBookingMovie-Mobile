import axios from "../utils/axios-custom";

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
    console.error("error api: ", error.response.data.message);

    return error;
  }
};
