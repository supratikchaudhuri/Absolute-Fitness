import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getProductWithPricing = async () => {
  try {
    const res = await api.get("stripe/gym-membership-pricing", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    return res;
  } catch (err) {
    alert(err.response.data.msg);
    console.log(err);
  }
};

export const createCheckoutSession = async (priceId) => {
  try {
    const res = await api.post(
      `stripe/create-checkout-session/${priceId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return res;
  } catch (err) {
    alert(err?.response?.data?.msg);
    console.log(err);
  }
};
