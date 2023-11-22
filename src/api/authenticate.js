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

export const requestResetPassword = async (username) => {
  try {
    const res = await api.post("authentication/resetPassword", {
      username,
    });
    const status = res.status;
    if (status === 200) {
      return res.data.msg;
    }
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (username, token, password) => {
  console.log(username, token, password);
  try {
    const res = await api.post(
      `authentication/resetPassword/${username}/${token}`,
      { password }
    );

    const status = res.status;
    const msg = res.data.msg;
    return { status, msg };
  } catch (err) {
    console.log(err);
  }
};
