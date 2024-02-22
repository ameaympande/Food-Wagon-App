import axios from "axios";

export const SignUpAPI = async (form) => {
  const { email, password } = form;
  const url = "https://food-wagon-server.onrender.com/";

  try {
    const body = {
      email: email,
      password: password,
    };

    const response = await axios.post(url + "users", body);
   
    if (response && response.status === 201) {
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    return err.response.data || "An error occurred during login.";
  }
};
