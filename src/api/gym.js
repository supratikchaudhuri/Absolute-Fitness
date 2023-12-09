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

export const getGym = async (gym_id) => {
  try {
    const res = await api.get(`gym/${gym_id}`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addGym = async (gymDetails, adminDetails) => {
  try {
    const res = await api.post(
      "gym/",
      { gym: gymDetails, admin: adminDetails },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return { status: res.status, data: res.data };
  } catch (err) {
    alert(err.response.data.msg);
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

export const addNewGymEquipment = async (gym_id, newEquipment) => {
  try {
    const res = await api.post(`gym/${gym_id}/equipment`, newEquipment, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
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
    return res.status;
  } catch (err) {
    console.log(err);
  }
};

export const deleteGymEquipment = async (gym_id, equipment_id) => {
  try {
    const res = await api.delete(`gym/${gym_id}/equipment/${equipment_id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    console.log(err);
  }
};

export const getGymTrainers = async (gym_id) => {
  try {
    const res = await api.get(`gym/${gym_id}/trainers`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGymStaff = async (gym_id) => {
  try {
    const res = await api.get(`gym/${gym_id}/staff`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGymMembers = async (gym_id) => {
  try {
    const res = await api.get(`gym/${gym_id}/members`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateGymBranch = async (updatedGym) => {
  try {
    console.log("updated", updatedGym.image_urls.length);
    const res = await api.put(`gym/${updatedGym.gym_id}`, updatedGym, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.status;
  } catch (err) {
    console.log(err);
  }
};
