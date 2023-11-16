import React from "react";
import { useLocation } from "react-router-dom";

const Franchise = () => {
  const { state } = useLocation();
  const gymDetails = state.gymDetails;

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>carousel</h1>
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div class="carousel-inner">
              {/* <div class="carousel-item active">
            <img class="d-block w-100" src="https://placeimg.com/1080/500/animals" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
                <h5>My Caption Title (1st Image)</h5>
                <p>The whole caption will only show up if the screen is at least medium size.</p>
            </div>
        </div> */}
              {gymDetails.image_urls.map((url) => (
                <div class="carousel-item">
                  <img class="d-block w-100" src={url} alt="gym slide" />
                </div>
              ))}
              {/* <div class="carousel-item">
            <img class="d-block w-100" src="https://placeimg.com/1080/500/arch" alt="Second slide">
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src="https://placeimg.com/1080/500/nature" alt="Third slide">
        </div> */}
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="col">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;
