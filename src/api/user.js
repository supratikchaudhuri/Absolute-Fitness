import api from "./axiosConfig";

let user = JSON.parse(localStorage.getItem("user"));

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

export const getAllUsers = async () => {
  try {
    const res = await api.get("user/", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (username) => {
  try {
    const res = await api.get(`user/${username}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (userDetails) => {
  try {
    let res;
    console.log(userDetails);
    if (userDetails.type === "member") {
      res = await api.put(`user/${userDetails.username}`, userDetails, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    } else {
      res = await api.put(`staff/${userDetails.username}`, userDetails, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    }

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

export const paymentSuccessful = async (paymentToken) => {
  try {
    console.log("called");
    const res = await api.post(
      "user/payment",
      { paymentToken },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    const accessToken = res.data.accessToken;
    console.log(accessToken, user.accessToken);
    console.log(user.accessToken === accessToken);
    user = { ...user, accessToken };
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    user = localStorage.getItem("user");
    console.log(user.accessToken === accessToken);
  } catch (err) {
    console.log(err);
  }
};
