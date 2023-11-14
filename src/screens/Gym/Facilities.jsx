import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

function Facilities() {
  const params = useParams();
  const { gym_id } = params;

  const user_gym = JSON.parse(localStorage.getItem("user_gym"));

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const getFacilities = async () => {
      try {
        const res = await axios.get(`../../gym/${gym_id}/facilities`);
        setFacilities(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFacilities();
  }, []);

  console.log(facilities);

  return facilities.length > 0 ? (
    <div
      id="facilities-div"
      className="container d-flex flex-column align-items-center"
    >
      <h4 className="page-title">Facilities</h4>

      <div className="row mt-3">
        {facilities.map((facility, index) => (
          <div className="col-xs-12 col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img
                src={facility.image_url}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{facility.name}</h5>
                <p className="card-text">
                  Operating Hours: {facility.opening_time} to{" "}
                  {facility.closing_time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="no-data">No Facilities listed by the gym yet.</div>
  );
}

export default Facilities;
