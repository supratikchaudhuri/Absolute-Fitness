import React, { useEffect, useState } from "react";
import AlertBox from "../../components/AlertBox";
import { getGym, updateGymBranch } from "../../api/gym";
import { useParams } from "react-router-dom";

const EditGym = () => {
  const { gym_id } = useParams();
  const [gymDetails, setGymDetails] = useState(null);
  const [urlInputs, setUrlInputs] = useState([]);

  const fetchGym = async () => {
    const gym = await getGym(gym_id);
    setGymDetails(gym);
    setUrlInputs(gym.image_urls);
  };

  useEffect(() => {
    fetchGym();
  }, []);

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

  const updateGym = async (e) => {
    e.preventDefault();

    setUrlInputs((prevUrls) => prevUrls.filter((url) => url !== ""));
    setGymDetails({ ...gymDetails, image_urls: urlInputs });

    const status = await updateGymBranch(gymDetails);
    if (status === 200) {
      alert("Gym details updated successfully.");
      window.location.href = `/gym/${gym_id}`;
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mb-4">
      {gymDetails ? (
        <>
          <h2 className="mt-4">Update Gym</h2>
          <form
            className="m-4 popup-form"
            onSubmit={(e) => {
              updateGym(e);
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
                    <label
                      htmlFor={`url${index}`}
                    >{`Add gym image URL:`}</label>
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
            <br />
            <button className="mt-3 btn btn-primary">Update Gym</button>
          </form>
        </>
      ) : (
        <AlertBox type="danger" message="Gym not found" />
      )}
    </div>
  );
};

export default EditGym;
