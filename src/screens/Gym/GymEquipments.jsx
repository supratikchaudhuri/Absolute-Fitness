import React, { useEffect, useState } from "react";
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
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { gym_id } = useParams();

  const [equipments, setEquipments] = useState([]);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [formType, setFormType] = useState("EDIT");
  const [equipmentDetails, setEquipmentDetails] = useState({});

  const getEquipments = async () => {
    const res = await getGymEquipments(gym_id);
    for (let i = 0; i < res.length; i++) {
      if (res[i].image_url) {
        res[i].image = <img src={`${res[i].image_url}`} alt="equipment" />;
        delete res[i].image_url;
      }
    }
    setEquipments(res);
  };

  useEffect(() => {
    getEquipments();
  }, []);

  //   console.log(equipments);

  const updateEquipment = async () => {
    try {
      const status = await updateGymEquipment(gym_id, equipmentDetails);
      if (status === 200) {
        setEquipments(
          equipments.map((equipment) => {
            if (equipment.equipment_id === equipmentDetails.equipment_id) {
              return equipmentDetails;
            }
            return equipment;
          })
        );
      } else {
        alert("Something went wrong");
      }
      setShowEquipmentForm(false);
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

  const addNewEquipment = async (e) => {
    e.preventDefault();

    setEquipmentDetails({ ...equipmentDetails, gymId: gym_id });

    const status = await addNewGymEquipment(gym_id, equipmentDetails);
    console.log(equipmentDetails);
    if (status === 200) {
      setEquipmentDetails({
        ...equipmentDetails,
        image: <img src={`${equipmentDetails.image_url}`} alt="equipment" />,
      });
      setEquipments({ ...equipments, equipmentDetails });
      setShowEquipmentForm(false);
      setEquipments({});
    }
  };

  //   console.log(equipments);

  const renderEquipmentForm = showEquipmentForm && (
    <form
      className="m-4 popup-form"
      onSubmit={(e) => {
        e.preventDefault();
        updateEquipment();
      }}
    >
      <h3 className="">Trainer Information Form</h3>
      <div className="row mb-2">
        <div className="col-xs-12 col-md-6">
          <label htmlFor="eqp-name" className="form-label">
            Name*
          </label>

          <input
            id="eqp-name"
            type="text"
            className="form-control"
            value={equipmentDetails.name || ""}
            onChange={(e) =>
              setEquipmentDetails({ ...equipmentDetails, name: e.target.value })
            }
          />
        </div>

        <div className="col-xs-12 col-md-6">
          <label htmlFor="eqp-image" className="form-label">
            Image*
          </label>
          <input
            id="eqp-image"
            type="text"
            className="form-control"
            value={equipmentDetails.image_url || ""}
            onChange={(e) =>
              setEquipmentDetails({
                ...equipmentDetails,
                image_url: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="mb-4 row">
        <div className="col-xs-12 col-md-6">
          <label htmlFor="quantity" className="form-label">
            Quantity*
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={equipmentDetails.quantity}
            onChange={(e) =>
              setEquipmentDetails({
                ...equipmentDetails,
                quantity: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <label htmlFor="last_serviced" className="form-label">
            Last Serviced
          </label>
          <input
            type="date"
            className="form-control"
            id="last_serviced"
            name="last_serviced"
            required
            value={equipmentDetails.last_serviced}
            onChange={(e) =>
              setEquipmentDetails({
                ...equipmentDetails,
                last_serviced: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary mb-0 inline"
        onClick={(e) =>
          formType === "EDIT" ? updateGymEquipment(e) : addNewEquipment(e)
        }
      >
        {formType === "ADD" ? "Add" : "Update"}
      </button>

      <button
        type="button"
        className="btn btn-danger ms-2"
        onClick={(e) => setShowEquipmentForm(false)}
      >
        Cancel
      </button>
    </form>
  );

  return equipments.length > 0 ? (
    <div className="container euipment-div">
      {renderEquipmentForm}
      <div className="center mb-2">
        <h4>Gym Equipments</h4>
        {(user.type === "root" ||
          (user.type === "admin" && user.gym_id == gym_id)) && (
          <button
            className="btn btn-primary float-end"
            onClick={(e) => {
              setFormType("ADD");
              setShowEquipmentForm(true);
            }}
          >
            Add Equipment
          </button>
        )}
      </div>

      <table
        className="table mt-0"
        align="middle"
        style={{ maxWidth: "1400px", margin: "auto" }}
      >
        <thead className="bg-light">
          <tr className="center">
            {Object.keys(equipments[0]).map((item, index) => (
              <th key={index} scope="col">
                <strong>{item.toUpperCase()}</strong>
              </th>
            ))}
            {user && (user.type === "admin" || user.type === "root") && (
              <th scope="col"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {equipments
            .map((equipment) => Object.values(equipment))
            .map((row, rowIndex) => (
              <tr key={rowIndex} className="center">
                {row.map((item, colIndex) => (
                  <td className="m-auto" key={colIndex}>
                    {item}
                  </td>
                ))}

                {((user && user.type === "admin" && user.gym_id == gym_id) ||
                  user.type === "root") && (
                  <td>
                    <i
                      style={{ marginRight: "30px" }}
                      className="fas fa-pen icon"
                      onClick={(e) => {
                        setFormType("EDIT");
                        setShowEquipmentForm(true);
                        setEquipmentDetails(equipments[rowIndex]);
                      }}
                    ></i>

                    <i
                      className="fas fa-trash ms-2 icon"
                      onClick={(e) => deleteEquipment(e, row[0])}
                    ></i>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ) : (
    <AlertBox type="warning" message="No Equipments listed by the gym yet." />
  );
}

export default GymEquipments;
