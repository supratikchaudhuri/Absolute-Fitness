import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Trainers() {
  const params = useParams();
  const { gym_id } = params;

  const user_gym = JSON.parse(localStorage.getItem("user_gym"));

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const getTrainers = async () => {
      try {
        const res = await axios.get(`../../gym/${gym_id}/trainers`);
        setTrainers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTrainers();
  }, []);
  console.log(trainers);

  return trainers.length > 0 ? (
    <div id="trainer-div" className="container">
      <h4 className="center mt-3 mb-3">Meet The Team</h4>
      <div className="row">
        {trainers.map((trainer, index) => (
          <div
            className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
            key={index}
          >
            <div className="card">
              <img src={trainer.image_url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{trainer.name}</h5>
                <p className="card-text">
                  Speciality: {trainer.speciality}
                  <br />
                  Years of Experience: {trainer.years_of_exp}
                  <br />
                  {trainer.description}
                </p>
                <div>
                  <Link to={`/trainer/${trainer.staff_id}/memberRecords`}>
                    <button className="btn btn-primary">See Performance</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="no-data">No Trainers Data Found.</div>
  );
}

export default Trainers;
