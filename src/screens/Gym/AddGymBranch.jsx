import React, { useState } from "react";

const AddGymBranch = () => {
  const [gymDetails, setGymDetails] = useState({ images: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gymDetails);
    // await addNewGymEquipment(gymDetails);
    // window.location.href = "/home";
  };

  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="gymName" className="form-label">
              Gym Name
            </label>
            <input
              type="text"
              className="form-control"
              id="gymName"
              placeholder="Enter gym name"
              name="name"
              value={gymDetails.name}
              onChange={(e) =>
                setGymDetails({ ...gymDetails, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="locationAddress" className="form-label">
              Location Address
            </label>
            <input
              type="text"
              className="form-control"
              id="locationAddress"
              placeholder="Enter location address"
              name="location"
              value={gymDetails.location}
              onChange={(e) =>
                setGymDetails({ ...gymDetails, location: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              placeholder="Enter phone number"
              name="phone"
              value={gymDetails.phone}
              onChange={(e) =>
                setGymDetails({ ...gymDetails, phone: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="images" className="form-label">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="images"
              name="images"
              multiple
              onChange={(e) =>
                setGymDetails({ ...gymDetails, images: e.target.files })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <a className="btn btn-danger ms-2" href="/home">
            Cancel
          </a>
        </form>
      </div>
    </>
  );
};

export default AddGymBranch;
