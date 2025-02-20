import api from "./axiosConfig";

export const login = async (username, password) => {
  try {
    const res = await api.post("authentication/login", {
      username,
      password,
    });
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.status;
  } catch (err) {
    alert(err?.response?.data?.msg);
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
    alert(err?.response?.data?.msg);
    console.log(err);
  }
};

export const resetPassword = async (token, password) => {
  console.log(token, password);
  try {
    const res = await api.post(`authentication/resetPassword/${token}`, {
      password,
    });

    const status = res.status;
    const msg = res.data.msg;
    return { status, msg };
  } catch (err) {
    alert(err?.response?.data?.msg);
    console.log(err);
  }
};
