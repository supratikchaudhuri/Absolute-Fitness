import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const updateStaff = async (updatedStaff) => {
  try {
    const res = await api.put(
      `staff/${updatedStaff.staff_id}`,
      {
        ...updatedStaff,
        staffId: updatedStaff.staff_id,
        partTime: updatedStaff.part_time,
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
