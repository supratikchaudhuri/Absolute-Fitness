import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AlertBox from "../components/AlertBox";
import { getGymStaff } from "../api/gym";
import { useParams } from "react-router-dom";
import { deleteStaff, updateStaff } from "../api/staff";

function GymStaff() {
  const { gymId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [staff, setStaff] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [staffDetails, setStaffDetails] = useState(null);

  const displayEditForm = (e) => {
    setShowEditForm(true);
  };

  const handleSubmit = async (updatedStaff) => {
    if (updatedStaff && updatedStaff.phone.length !== 10) {
      alert("Phone needs to be 10 digits long");
      return;
    }

    const status = await updateStaff(updatedStaff);
    console.log(status);
    if (status === 200) {
      setStaff(
        staff.map((s) =>
          s.staff_id === updatedStaff.staff_id ? updatedStaff : s
        )
      );
    } else {
      alert("Error updating staff");
    }

    setShowEditForm(false);
  };
  console.log(staff);

  const deleteGymStaff = async (e, staffId) => {
    if (staffId === user.staff_id) {
      alert("You cannot delete yourself!");
      return;
    }
    const ans = window.confirm("Are you sure you want to delete this staff?");
    if (ans) {
      const status = await deleteStaff(staffId);
      if (status === 200) {
        setStaff(staff.filter((s) => s.staff_id !== staffId));
      }
    }
  };

  const getStaff = async () => {
    const res = await getGymStaff(gymId);
    setStaff(res);
  };

  useEffect(() => {
    getStaff();
  }, []);

  const renderEditForm = staffDetails && (
    <div
      className="edit-form-div"
      style={{ display: showEditForm ? "inline" : "none" }}
    >
      <form
        className="m-4 popup-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(staffDetails);
        }}
      >
        <div className="mb-4 row">
          <div className="col">
            <label htmlFor="staffID" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="staffID"
              name="staff_id"
              value={staffDetails.staff_id}
              disabled
            />
          </div>
          <div className="col">
            <label htmlFor="partTime" className="form-label">
              Part Time
            </label>
            <input
              type="text"
              className="form-control"
              id="partTime"
              name="part_time"
              value={staffDetails.part_time}
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="col">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control"
              id="salary"
              name="salary"
              value={staffDetails.salary}
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="name"
              value={staffDetails.name}
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="col">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={staffDetails.phone}
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Job Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            value={staffDetails.description}
            onChange={(e) =>
              setStaffDetails({
                ...staffDetails,
                [e.target.name]: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary mb-0">
              Update
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-danger mb-0"
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {staff.length > 0 ? (
        <div className="gym-staff-div center">
          {renderEditForm}

          <h4>Gym Staff</h4>
          <Table
            content="staff"
            data={staff}
            deleteItem={deleteGymStaff}
            displayEditForm={displayEditForm}
            renderEditForm={renderEditForm}
            setStaffDetails={setStaffDetails}
          ></Table>
        </div>
      ) : (
        <AlertBox message="No Staff found" type="danger" />
      )}
    </>
  );
}

export default GymStaff;
