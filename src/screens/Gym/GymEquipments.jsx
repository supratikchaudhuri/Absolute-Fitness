import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";
import {
  addNewGymEquipment,
  deleteGymEquipment,
  getGymEquipments,
  updateGymEquipment,
} from "../../api/gym";
import AlertBox from "../../components/AlertBox";

// TODO: gym equipments add delete, etc
function GymEquipments() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { gym_id } = useParams();

  const [equipments, setEquipments] = useState([]);
  const [showEditEquipmentForm, setShowEditEquipmentForm] = useState(false);
  const [updatedEquipment, setUpdatedEquipment] = useState({
    quantity: "",
    last_serviced: "",
  });
  const [showNewEquipmentForm, setShowNewEquipmentForm] = useState(false);
  //   const [newEquipment, setNewEquipment] = useState({});

  const getEquipments = async () => {
    const res = await getGymEquipments(gym_id);
    setEquipments(processEquipmentData(res));
  };

  useEffect(() => {
    getEquipments();
  }, []);

  const processEquipmentData = (equipmentData) => {
    let updatedEquipmentData = [];
    for (let i = 0; i < equipmentData.length; i++) {
      let record = equipmentData[i];
      let updatedRecord = record;
      updatedRecord["image_url"] = <img src={record["image_url"]} />;
      delete updatedRecord.gym_id;
      updatedRecord["last_serviced"] =
        updatedRecord["last_serviced"] &&
        updatedRecord["last_serviced"].substring(0, 10);
      updatedEquipmentData.push(updatedRecord);
    }
    setUpdatedEquipment(updatedEquipmentData[0]);
    return updatedEquipmentData;
  };

  const updateEquipment = async () => {
    try {
      const status = await updateGymEquipment(gym_id, updatedEquipment);
      if (status === 200) {
        setEquipments(
          equipments.map((equipment) => {
            if (equipment.equipment_id === updatedEquipment.equipment_id) {
              return updatedEquipment;
            }
            return equipment;
          })
        );
      } else {
        alert("Something went wrong");
      }
      setShowEditEquipmentForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEquipment = async (e, equipmentId) => {
    const ans = window.confirm(
      "Are you sure you want to delete this equipment?"
    );
    if (ans) {
      const status = await deleteGymEquipment(gym_id, equipmentId);
      if (status === 200) {
        setEquipments(equipments.filter((e) => e.equipment_id !== equipmentId));
        alert("Equipment deleted successfully");
      }
    }
  };

  //   const addNewEquipment = async (e) => {
  //     e.preventDefault();
  //     const status = await addNewGymEquipment(gym_id, newEquipment);
  //     if (status === 200) {
  //       setEquipments(
  //         equipments.map((equipment) => {
  //           if (equipment.equipment_id === newEquipment.equipment_id) {
  //             return newEquipment;
  //           }
  //           return equipment;
  //         })
  //       );
  //     }
  //     setShowNewEquipmentForm(false);
  //   };

  const handleChange = (e) => {
    setUpdatedEquipment({
      ...updatedEquipment,
      [e.target.name]: e.target.value,
    });
  };

  const renderEditEquipmentForm = showEditEquipmentForm && (
    <form
      className="m-4 popup-form"
      onSubmit={(e) => {
        e.preventDefault();
        updateEquipment();
      }}
    >
      <div className="mb-4 row w-3">
        <div className="col">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            name="quantity"
            value={updatedEquipment.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="last_serviced" className="form-label">
            Last Serviced
          </label>
          <input
            type="date"
            className="form-control"
            id="last_serviced"
            name="last_serviced"
            required
            value={
              updatedEquipment.last_serviced
                ? updatedEquipment.last_serviced
                : ""
            }
            onChange={handleChange}
            max={new Date().toJSON().slice(0, 10)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary mb-0"
        style={{ width: "100%" }}
      >
        Update
      </button>
      <button
        type="button"
        className="btn btn-danger mb-0"
        onClick={(e) => setShowEditEquipmentForm(false)}
        style={{ width: "100%" }}
      >
        Cancel
      </button>
    </form>
  );

  const renderNewEquipmentForm = showNewEquipmentForm && <></>;

  return equipments.length > 0 ? (
    <div className="container center euipment-div">
      {renderEditEquipmentForm}
      {renderNewEquipmentForm}
      <h4>Gym Equipments</h4>
      {user.type === "staff" ||
        (user.type === "admin" && (
          <button
            className="btn btn-primary float-end mb-3"
            onCick={(e) => setShowNewEquipmentForm(true)}
          >
            Add Equpments
          </button>
        ))}
      <Table
        content="equipments"
        data={equipments}
        setEquipments={processEquipmentData}
        displayEditForm={setShowEditEquipmentForm}
        deleteEquipment={deleteEquipment}
      />
    </div>
  ) : (
    <AlertBox type="warning" message="No Equipments listed by the gym yet." />
  );
}

export default GymEquipments;
