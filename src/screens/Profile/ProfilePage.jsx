import React, { useEffect, useState } from "react";

import axios from "axios";
import "../../profileStyles.css";
import AlertBox from "../../components/AlertBox";
import { getGym } from "../../api/gym";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  //   TODO: show paying customer or not
  // TODO: aesthetic page, add more details paying cutomer or not, (maybe add healt record here?)
  //    TODO: global profile less info
  const [userGym, setUserGym] = useState(null);

  const fetchUserGym = async () => {
    const gym = await getGym(user.gym_id);
    setUserGym(gym);
  };

  useEffect(() => {
    if (user) {
      fetchUserGym();
    }
  }, []);

  console.log(userGym);

  return (
    <>
      <div className="col profile-details">
        <div className="row">
          {!user ? (
            <AlertBox
              type="danger"
              message="Please login to view user details"
            />
          ) : (
            <>
              <div className="col-xs-12 col-md-4 width-auto fit-content mb-3">
                <i className="fa fa-user avatar mb-3" aria-hidden="true"></i>
                <br />
              </div>

              <div className="col-xs-12 col-md-8 ms-auto">
                <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {user.name}
                </h2>

                <p>
                  <strong>Email:</strong> {user.username}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Sex:</strong> {user.sex}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {user.dob}
                </p>

                <p>
                  <strong>User Type:</strong> {user.type}
                </p>

                <a href="edit-profile" className="btn btn-primary">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                  <span className="ms-2">Edit Profile</span>
                </a>
              </div>
            </>
          )}

          {user && user.type !== "root" && userGym && (
            <div className="col-xs-12 col-md-12 ms-auto">
              <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                User's Gym
              </h2>

              <p>
                <strong>Gym:</strong>{" "}
                <a href={`/gym/${userGym.gym_id}`}>{userGym.branch}</a>
              </p>
              <p>
                <strong>Gym Address:</strong> {userGym.location}
              </p>
              <p>
                <strong>Gym Phone:</strong> {userGym.phone}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
