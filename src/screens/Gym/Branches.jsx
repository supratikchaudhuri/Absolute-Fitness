import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Branches() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const getBranches = async () => {
      try {
        const res = await axios.get("gym/");
        setBranches(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBranches();
  }, []);

  const navigateToFranchise = (branch) => {
    navigate(`/gym/${branch.gym_id}`, { state: { gymDetails: branch } });
  };

  return (
    <div
      id="branches-div"
      className="container d-flex flex-column align-items-center"
    >
      <h4 className="page-title">Absolute Fitness Branches</h4>

      <div className="row mt-3">
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
                  <i class="fa-solid fa-location-dot"></i>
                  {branch.location}
                </h5>
                <p>
                  <i class="fa-solid fa-phone"></i>: {branch.phone}
                </p>

                {/* <div className="center">
                  <a
                    href={`gym/${branch.gym_id}/facilities`}
                    className="btn btn-primary mt-2 btn-sm"
                  >
                    View Facilities
                  </a>
                  <a
                    href={`gym/${branch.gym_id}/trainers`}
                    className="btn btn-primary mt-2 ms-2 btn-sm"
                  >
                    View Trainers
                  </a>
                  <a
                    href={`gym/${branch.gym_id}/equipments`}
                    className="btn btn-primary mt-2 ms-2 btn-sm"
                  >
                    View Equipments
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Branches;
