import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addGym, getAllGyms } from "../../api/gym";

function Branches() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [displayAddBranchForm, setDisplayAddBranchForm] = useState(false);
  const [gymDetails, setGymDetails] = useState({});
  const [adminDetails, setAdminDetails] = useState({});

  const [urlInputs, setUrlInputs] = useState([""]); // Initial state with one empty URL input

  const handleUrlChange = (index, value) => {
    // Update the URL at the specified index in the array
    setUrlInputs((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls[index] = value;
      return newUrls;
    });
  };

  console.log(urlInputs);

  const handleAddMore = () => {
    setUrlInputs((prevUrls) => [...prevUrls, ""]);
  };

  const handleRemove = (index) => {
    setUrlInputs((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const getBranches = async () => {
      const res = await getAllGyms();
      setBranches(res);
    };

    getBranches();
  }, []);

  const navigateToFranchise = (branch) => {
    navigate(`/gym/${branch.gym_id}`, { state: { gymDetails: branch } });
  };

  const addBranch = async () => {
    urlInputs.filter((url) => url !== "");
    gymDetails["image_urls"] = urlInputs;
    const { status, data } = await addGym(gymDetails, adminDetails);
    console.log(data);
    if (status === 200) {
      setBranches((o) => [data, ...o]);
      setDisplayAddBranchForm(false);
    } else {
      alert(data.message);
    }
  };

  const addBranchForm = displayAddBranchForm && (
    <div className="container mb-4">
      <h2 className="mt-4">Enter New Gym's Details</h2>
      <form
        className="m-4 popup-form"
        onSubmit={(e) => {
          e.preventDefault();
          addBranch();
        }}
      >
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div>
              <label htmlFor="name" className="form-label">
                Branch Name*
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                name="branch"
                onChange={(e) =>
                  setGymDetails({ ...gymDetails, branch: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="col-xs-12 col-md-6">
            <div>
              <label htmlFor="phone" className="form-label">
                Branch Phone*
              </label>
              <input
                type="number"
                className="form-control mb-2"
                id="phone"
                name="phone"
                onChange={(e) =>
                  setGymDetails({ ...gymDetails, phone: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div>
              <label htmlFor="location" className="form-label">
                Location*
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="location"
                name="location"
                onChange={(e) =>
                  setGymDetails({ ...gymDetails, location: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div>
              <label htmlFor="pin" className="form-label">
                Zipcode*
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="pin"
                name="pincode"
                onChange={(e) =>
                  setGymDetails({ ...gymDetails, pincode: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <label className="form-label">Choose gym images</label>

          {urlInputs.map((url, index) => (
            <div className="row mb-1" key={index}>
              <div className="col">
                <label htmlFor={`url${index}`}>{`Add gym image URL:`}</label>
              </div>
              <div className="col">
                <input
                  className="form-control form-control-sm"
                  type="url"
                  id={`url${index}`}
                  name={`url${index}`}
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                />
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemove(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-sm btn-warning"
          onClick={handleAddMore}
        >
          Add image
        </button>

        <h5 className="mt-2">
          Each gym needs an admin. Please add admin detials here
        </h5>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <label htmlFor="admin-email" className="form-label">
              Admin Email*
            </label>
            <input
              type="email"
              className="form-control mb-2"
              id="admin-email"
              name="admin-email"
              onChange={(e) =>
                setAdminDetails({ ...gymDetails, email: e.target.value })
              }
              required
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <label htmlFor="admin-salary" className="form-label">
              Admin Salary($)*
            </label>
            <input
              type="number"
              className="form-control mb-2"
              id="admin-salary"
              name="admin-salary"
              onChange={(e) =>
                setAdminDetails({ ...gymDetails, salary: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="mt-2">
          <button type="submit" className="btn btn-primary">
            Add Gym
          </button>
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={(e) => setDisplayAddBranchForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {addBranchForm}
      <div id="branches-div" className="container center ">
        <button
          className="btn btn-primary float-end"
          onClick={(e) => setDisplayAddBranchForm(true)}
        >
          Add Branch
        </button>
        <h4 className="page-title">Absolute Fitness Branches</h4>

        <div className="row mt-4">
          {branches.map((branch) => (
            <div
              className="col-xs-12 col-sm-6 col-md-4 mb-4 pointer"
              onClick={(e) => navigateToFranchise(branch)}
            >
              <div className="card h-100">
                <img
                  src={branch.image_urls[0]}
                  className="card-img-top"
                  alt="..."
                />

                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fa-solid fa-location-dot color-red"></i>:{" "}
                    {branch.location}
                  </h5>
                  <p>
                    <i className="fa-solid fa-phone color-grey"></i>:{" "}
                    {branch.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Branches;
