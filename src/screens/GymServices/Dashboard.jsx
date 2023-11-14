import React from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const myGym = JSON.parse(localStorage.getItem("user_gym"));
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container">
      <h4>My Dashboard</h4>

      <div className="row">
        <div className="col">
          <img src={myGym.image_url} />
          <p>Gym ID: {myGym.gym_id}</p>
          <p>Address: {myGym.location}</p>
          <p>phone: {myGym.phone}</p>
        </div>

        <div className="col">
          <div className="center">
            <a
              href={`gym/${myGym.gym_id}/facilities`}
              className="btn btn-primary mt-2"
            >
              View Facilities
            </a>
            <a
              href={`gym/${myGym.gym_id}/trainers`}
              className="btn btn-primary mt-2"
            >
              View Trainers
            </a>
            <a
              href={`gym/${myGym.gym_id}/equipments`}
              className="btn btn-primary mt-2"
            >
              View Equipments
            </a>
            {user.type === "admin" && (
              <>
                <a
                  href={`gym/${myGym.gym_id}/members`}
                  className="btn btn-primary mt-2"
                >
                  View Customers
                </a>
                <a
                  href={`gym/${myGym.gym_id}/temp`}
                  className="btn btn-primary mt-2"
                >
                  View Custoers Subscriptions
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
