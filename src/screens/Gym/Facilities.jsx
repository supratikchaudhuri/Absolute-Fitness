import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGymFacilities } from "../../api/gym";
import AlertBox from "../../components/AlertBox";

function Facilities() {
  const params = useParams();
  const { gym_id } = params;

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const getFacilities = async () => {
      const res = await getGymFacilities(gym_id);
      setFacilities(res);
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
    <AlertBox type="warning" message="No Facilities listed by the gym yet." />
  );
}

export default Facilities;
