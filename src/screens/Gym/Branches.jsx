import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGyms } from "../../api/gym";

function Branches() {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const getBranches = async () => {
      const res = await getAllGyms();
      setBranches(res);
    };

    getBranches();
  }, []);

  return (
    <>
      <div id="branches-div" className="container center ">
        {user && user.type === "root" && (
          <a className="btn btn-outline-success float-end" href="/gym/addGym">
            Add Branch
          </a>
        )}
        <h4 className="page-title">Absolute Fitness Branches</h4>
        <div className="row mt-4">
          {branches.map((branch) => (
            <div
              className="col-xs-12 col-sm-6 col-md-4 mb-4 pointer"
              onClick={() => navigate(`/gym/${branch.gym_id}`)}
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
