import api from "./axiosConfig";

export const login = async (username, password) => {
  try {
    const res = await api.post("authentication/login", {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
