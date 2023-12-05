import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getWorkoutPlanForUser = async (username) => {
  try {
    const res = await api.get(`workoutPlan/${username}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
