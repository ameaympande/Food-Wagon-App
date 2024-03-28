import axios from 'axios';

export const PlaceOrderAPI = async form => {
  let url = 'http://localhost:3500/order/';

  const body = {
    customerId: form.customerId,
    restaurantId: form.restaurantId,
    items: form.items,
  };

  try {
    const response = await axios.post(url, body);

    if (response && response.status === 201) {
      return response;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    return err.response || 'An error occurred while fetching restaurant data.';
  }
};
