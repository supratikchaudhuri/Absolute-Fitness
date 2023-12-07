import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getHealthRecordForUser = async (username) => {
  try {
    const res = await api.get(`healthRecord/${username}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addHealthRecord = async (record) => {
  console.log(record);
  try {
    const res = await api.post(`healthRecord`, record, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    alert(err.response.data.msg);
  }
};
