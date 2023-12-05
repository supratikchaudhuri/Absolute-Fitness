import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const signup = async (userDetails) => {
  try {
    const res = await api.post("user/signup", userDetails);
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.status;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (userDetails) => {
  try {
    console.log(userDetails);
    const res = await api.put(`user/${userDetails.username}`, userDetails, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.status;
  } catch (err) {
    console.log(err);
    return err.response.status;
  }
};

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
