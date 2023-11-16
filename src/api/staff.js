import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const updateStaff = (updateStaff) => {
  try {
    const res = api.put(`staff/${updateStaff.staff_id}`, updateStaff, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    console.log(err);
  }
};

export const deleteStaff = async (staffId) => {
  try {
    const res = await api.delete(`staff/${staffId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    console.log(err);
  }
};
