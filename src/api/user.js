import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const deleteGymUser = async (userId) => {
  try {
    const res = await api.delete(`user/${userId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    console.log(err);
  }
};
