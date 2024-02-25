import axios from 'axios';

export const LoginAPI = async form => {
  const {email, password} = form;
  const url = 'https://food-wagon-server.onrender.com/';

  try {
    const body = {
      email: email,
      password: password,
    };

    const response = await axios.post(url + 'login', body);

    if (response && response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    return err.response || 'An error occurred during login.';
  }
};
