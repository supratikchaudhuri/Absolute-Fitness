import React, { useState, useEffect } from "react";
import axios from "axios";

function Branches() {
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
      <h4 className="page-title">Absolute Fitness Branches</h4>

      <div className="row">
        {branches.map((branch) => (
          <div className="col-xs-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100">
              <img src={branch.image_url} className="card-img-top" alt="..." />

              <div className="card-body">
                <h5 className="card-title">{branch.location}</h5>
                <p>Phone: {branch.phone}</p>
                <p>{branch.state}</p>
                <p>{branch.zip}</p>
                <p>Monthly membership fee: ${branch.membership_fee}</p>

                <div className="center">
                  <a
                    href={`gym/${branch.gym_id}/facilities`}
                    className="btn btn-primary mt-2"
                  >
                    View Facilities
                  </a>
                  <a
                    href={`gym/${branch.gym_id}/trainers`}
                    className="btn btn-primary mt-2"
                  >
                    View Trainers
                  </a>
                  <a
                    href={`gym/${branch.gym_id}/equipments`}
                    className="btn btn-primary mt-2"
                  >
                    View Equipments
                  </a>
                  {}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Branches;
