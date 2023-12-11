import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getDietPlanForUser = async (username) => {
  try {
    const res = await api.get(`dietPlan/${username}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    alert(err.response.data.msg);
    console.log(err);
  }
};
