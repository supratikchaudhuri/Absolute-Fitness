import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { MDBCol, MDBInput, MDBRow, MDBBtn } from "mdb-react-ui-kit";

function GymEquipments() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [equipments, setEquipments] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedEquipment, setUpdatedEquipment] = useState({
    quantity: "",
    last_serviced: "",
  });

  const getGymEquipments = async () => {
    try {
      const res = await axios.get(`/gym/${user.gym_id}/equipments`);
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
      // delete updatedRecord.equipment_id
      updatedRecord["last_serviced"] =
        updatedRecord["last_serviced"] &&
        updatedRecord["last_serviced"].substring(0, 10);
      updatedEquipmentData.push(updatedRecord);
    }
    console.log(updatedEquipmentData);
    setUpdatedEquipment(updatedEquipmentData[0]);
    return updatedEquipmentData;
  };

  const updateEquipment = async () => {
    try {
      const res = await axios.put(
        `/gym/${user.gym_id}/equipment/${updatedEquipment.equipment_id}`,
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
      <MDBRow className="mb-4 w-3">
        <MDBCol>
          <MDBInput
            label="quantity"
            name="quantity"
            value={updatedEquipment.quantity}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            label="Last Serviced"
            type="date"
            size="md"
            onChange={handleChange}
            name="last_serviced"
            value={
              updatedEquipment.last_serviced
                ? updatedEquipment.last_serviced
                : ""
            }
            max={new Date().toJSON().slice(0, 10)}
          />
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-0" block>
        Update
      </MDBBtn>
      <MDBBtn
        type="button"
        color="danger"
        onClick={(e) => setShowEditForm(false)}
        className="mb-0"
        block
      >
        Cancel
      </MDBBtn>
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
