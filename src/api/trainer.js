import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getClientHealthRecords = async (client_id) => {
  try {
    const res = await api.get(`/trainer/${client_id}/memberRecords`, {
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

export const addNewTrainer = async (newTrainer, gymId) => {
  try {
    const res = await api.post(
      "/trainer",
      { ...newTrainer, gymId },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return { status: res.status, data: res.data };
  } catch (err) {
    alert(err?.response?.data?.msg);
    console.log(err);
  }
};
