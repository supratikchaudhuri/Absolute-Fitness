import React from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../../components/Carousel";

const Franchise = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { state } = useLocation();
  const gymDetails = state.gymDetails;

  return (
    <div className="container center">
      <h4>Gym Gallery</h4>
      <Carousel images={gymDetails.image_urls} />

      <div>
        <p>
          <i class="fa-solid fa-phone"></i>: {gymDetails.phone}
        </p>
        <p>
          <i class="fa-solid fa-location-dot"></i> {gymDetails.location}
        </p>

        <div className="center">
          <a
            href={`/gym/${gymDetails.gym_id}/facilities`}
            className="btn btn-primary mt-2 btn-sm"
          >
            View Facilities
          </a>
          <a
            href={`/gym/${gymDetails.gym_id}/trainers`}
            className="btn btn-primary mt-2 ms-2 btn-sm"
          >
            View Trainers
          </a>
          <a
            href={`/gym/${gymDetails.gym_id}/equipments`}
            className="btn btn-primary mt-2 ms-2 btn-sm"
          >
            View Equipments
          </a>

          {user.type === "admin" && (
            <>
              <a
                href={`/gym/${gymDetails.gym_id}/members`}
                className="btn btn-primary mt-2 ms-2 btn-sm"
              >
                View Members
              </a>
              <a
                href={`/gym/${gymDetails.gym_id}/staff`}
                className="btn btn-primary mt-2 ms-2 btn-sm"
              >
                View Staff
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Franchise;
