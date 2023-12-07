import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const addStaff = async (staffDetails) => {
  try {
    const res = await api.put(`staff/signup`, staffDetails, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    console.log(err);
  }
};

export const updateStaff = async (updatedStaff) => {
  try {
    const res = await api.put(
      `staff/${updatedStaff.staff_id}`,
      {
        ...updatedStaff,
        staffId: updatedStaff.staff_id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
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

export const getAllStaffs = async () => {
  try {
    const res = await api.get("staff/", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
