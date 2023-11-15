import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";

function GymEquipments() {
  const { gym_id } = useParams();

  const [equipments, setEquipments] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedEquipment, setUpdatedEquipment] = useState({
    quantity: "",
    last_serviced: "",
  });

  const getGymEquipments = async () => {
    try {
      const res = await axios.get(`/gym/${gym_id}/equipments`);
      setEquipments(processEquipmentData(res.data));
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getGymEquipments();
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
      const res = await axios.put(
        `/gym/${gym_id}/equipment/${updatedEquipment.equipment_id}`,
        updatedEquipment
      );
      getGymEquipments();
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setUpdatedEquipment({
      ...updatedEquipment,
      [e.target.name]: e.target.value,
    });
  };

  const renderEditForm = showEditForm && (
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
        onClick={(e) => setShowEditForm(false)}
        style={{ width: "100%" }}
      >
        Cancel
      </button>
    </form>
  );

  return equipments.length > 0 ? (
    <div className="euipment-div">
      {renderEditForm}
      <Table
        content="equipments"
        data={equipments}
        setEquipments={processEquipmentData}
        displayEditForm={setShowEditForm}
      />
    </div>
  ) : (
    <div className="no-data">No equipment data found</div>
  );
}

export default GymEquipments;
