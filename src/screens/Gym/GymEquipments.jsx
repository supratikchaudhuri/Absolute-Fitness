import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";
import {
  addNewGymEquipment,
  getGymEquipments,
  updateGymEquipment,
} from "../../api/gym";
import { render } from "@testing-library/react";

function GymEquipments() {
  const { gym_id } = useParams();

  const [equipments, setEquipments] = useState([]);
  const [showEditEquipmentForm, setShowEditEquipmentForm] = useState(false);
  const [updatedEquipment, setUpdatedEquipment] = useState({
    quantity: "",
    last_serviced: "",
  });
  const [showNewEquipmentForm, setShowNewEquipmentForm] = useState(false);
  const [newEquipment, setNewEquipment] = useState({});

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

  const addNewEquipment = async (e) => {
    e.preventDefault();
    const status = await addNewGymEquipment(gym_id, newEquipment);
    if (status === 200) {
      setEquipments(
        equipments.map((equipment) => {
          if (equipment.equipment_id === newEquipment.equipment_id) {
            return newEquipment;
          }
          return equipment;
        })
      );
    }
    setShowNewEquipmentForm(false);
  };

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
      <button
        className="btn btn-primary float-end mb-3"
        onCick={(e) => setShowNewEquipmentForm(true)}
      >
        Add Equpments
      </button>
      <Table
        content="equipments"
        data={equipments}
        setEquipments={processEquipmentData}
        displayEditForm={setShowEditEquipmentForm}
      />
    </div>
  ) : (
    <div className="no-data">No equipment data found</div>
  );
}

export default GymEquipments;
