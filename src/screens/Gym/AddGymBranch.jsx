import React, { useState } from "react";
import { addGym } from "../../api/gym";

const AddGymBranch = () => {
  const [gymDetails, setGymDetails] = useState({
    branch: "Steroid Fitness",
    phone: "6969696969",
    location: "18 Columbia",
    pincode: "69420",
    image_urls: [],
  });
  const [adminDetails, setAdminDetails] = useState({
    staffId: "new.admin@gmail.com",
    name: "Proffesor X",
    salary: "70000",
  });

  const [urlInputs, setUrlInputs] = useState([
    "https://i.insider.com/5cc74939b14bf43dd85e6d03?width=1000&format=jpeg&auto=webp",
    "https://www.lakeflato.com/sites/default/files/project-media/8_1.jpg",
  ]);

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

  const addBranchFn = async (e) => {
    e.preventDefault();
    urlInputs.filter((url) => url !== "");
    gymDetails["image_urls"] = urlInputs;
    const { status, data } = await addGym(gymDetails, adminDetails);
    console.log(data);
    if (status === 200) {
      alert("Branch Added Successfully");
      window.location.href = "/home";
    } else {
      alert("Error adding branch");
    }
  };

  return (
    <>
      <div className="container mb-4">
        <h2 className="mt-4">Enter New Gym's Details</h2>
        <form
          className="m-4 popup-form"
          onSubmit={(e) => {
            e.preventDefault();
            addBranchFn();
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
                  placeholder="Hamptons"
                  value={gymDetails.branch}
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
                  value={gymDetails.phone}
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
                  value={gymDetails.location}
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
                  value={gymDetails.pincode}
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
            <div className="col-xs-12 col-md-4">
              <label htmlFor="admin-email" className="form-label">
                Admin Email*
              </label>
              <input
                type="email"
                className="form-control mb-2"
                id="admin-email"
                name="admin-email"
                value={adminDetails.staffId}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, staffId: e.target.value })
                }
                required
              />
            </div>
            <div className="col-xs-12 col-md-4">
              <label htmlFor="admin-name" className="form-label">
                Admin Name*
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="admin-name"
                name="admin-name"
                value={adminDetails.name}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, name: e.target.value })
                }
                required
              />
            </div>
            <div className="col-xs-12 col-md-4">
              <label htmlFor="admin-salary" className="form-label">
                Admin Salary($)*
              </label>
              <input
                type="email"
                className="form-control mb-2"
                id="admin-salary"
                name="admin-salary"
                value={adminDetails.salary}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, salary: e.target.value })
                }
                required
              />
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-4">
                <label htmlFor="admin-dob" className="form-label">
                  Admin Date of Birth*
                </label>
                <input
                  type="date"
                  className="form-control mb-2"
                  id="admin-dob"
                  name="admin-dob"
                  value={adminDetails.dob}
                  onChange={(e) =>
                    setAdminDetails({
                      ...adminDetails,
                      dob: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col">
                <label htmlFor="admin-sex" className="form-label">
                  Sex
                </label>
                <br />
                <select
                  required
                  className="custom-select w-100"
                  id="sex-input"
                  name="sex"
                  onChange={(e) =>
                    setAdminDetails((o) => ({
                      ...o,
                      sex: e.target.value,
                    }))
                  }
                >
                  <option>Choose your sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="col-xs-12 col-md-4">
              <label htmlFor="admin-password" className="form-label">
                Admin Password*
              </label>
              <input
                type="password"
                className="form-control mb-2"
                id="admin-password"
                name="admin-password"
                value={adminDetails.password}
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="mt-2">
            <button type="submit" className="btn btn-primary">
              Add Gym
            </button>
            <a type="button" className="btn btn-danger ms-2" href="/home">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddGymBranch;
