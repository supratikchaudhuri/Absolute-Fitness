import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const addStaff = async (staffDetails) => {
  try {
    const res = await api.post(`staff/signup`, staffDetails, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    alert(err?.response?.data?.msg);
    console.log(err);
  }
};

export const updateStaff = async (updatedStaff) => {
  const staffId =
    updatedStaff.username ||
    updatedStaff.staffId ||
    updatedStaff.staff_id ||
    updatedStaff.email;
  try {
    const res = await api.put(
      `staff/${staffId}`,
      {
        ...updatedStaff,
        staffId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return res.status;
  } catch (err) {
    alert(err?.response?.data?.msg);
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
    alert(err?.response?.data?.msg);
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
    alert(err?.response?.data?.msg);
    console.log(err);
  }
};
