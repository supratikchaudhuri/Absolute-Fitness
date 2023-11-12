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

  return (
    <div id="branches-div" className="container">
      <h4 className="center mt-3 mb-3">Absolute Fitness Branches</h4>

      <div className="row">
        {branches.map((branch) => (
          <div className="col-xs-12 col-md-4 mb-4">
            <div className="card h-100">
              <img src={branch.image_url} className="card-img-top" alt="..." />

              <div className="card-body">
                <h5 className="card-title">{branch.location}</h5>
                <p>Phone: {branch.phone}</p>
                <p>{branch.state}</p>
                <p>{branch.zip}</p>
                <p>Monthly membership fee: ${branch.membership_fee}</p>

                <button
                  className="btn btn-primary mt-2"
                  onClick={(e) =>
                    navigate(`../gym/${branch.gym_id}/facilities`)
                  }
                >
                  View Facilities
                </button>
                <button
                  className="btn btn-primary ms-2 mt-2"
                  onClick={(e) => navigate(`../gym/${branch.gym_id}/trainers`)}
                >
                  View Trainers
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Branches;
