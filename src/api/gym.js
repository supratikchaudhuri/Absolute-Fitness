import api from "./axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

export const getAllGyms = async () => {
  try {
    const res = await api.get("gym/");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGymFacilities = async (gym_id) => {
  try {
    const res = await api.get(`gym/${gym_id}/facilities`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGymEquipments = async (gym_id) => {
  try {
    const res = await api.get(`gym/${gym_id}/equipments`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateGymEquipment = async (gym_id, updatedEquipment) => {
  try {
    const res = await api.put(
      `gym/${gym_id}/equipment/${updatedEquipment.equipment_id}`,
      updatedEquipment,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
