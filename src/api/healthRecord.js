import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getHealthRecordForUser = async (username) => {
  try {
    const res = await api.get(`healthPlan/${username}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
