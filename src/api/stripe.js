import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getProducts = async () => {
  try {
    const res = await api.get("stripe/gym-membership-pricing", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
