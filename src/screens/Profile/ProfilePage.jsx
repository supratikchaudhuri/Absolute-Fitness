import React, { useEffect, useState } from "react";

import axios from "axios";
import "../../profileStyles.css";
import AlertBox from "../../components/AlertBox";
import { getGym } from "../../api/gym";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  //   TODO: show paying customer or not
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(user);
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

  const handleChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedProfile);
    if (updatedProfile["phone"].length !== 10) {
      alert("phone needs to be 10 digits long");
      return;
    }
    try {
      if (user.type === "member") {
        const res = await axios.put(`/user/${user.email}`, {
          ...updatedProfile,
          ["gymId"]: user.gym_id,
        });
        let newProfile = updatedProfile;
        delete newProfile.password;
        console.log(newProfile);
        localStorage.setItem("user", JSON.stringify(newProfile));
        setShowEditForm(false);
        alert("Profile Updated Successfully !");
      }
    } catch (err) {
      alert(err.response.data.msg || err);
    }
  };

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
                <h2 style={{ "font-weight": 300 }}>{user.name}</h2>

                <p>
                  <strong>Email: </strong>
                  {user.username}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {user.phone}
                </p>
                <p>
                  <strong>Sex: </strong>
                  {user.sex}
                </p>
                <p>
                  <strong>Date of Birth: </strong>
                  {user.dob}
                </p>

                <p>
                  <strong>User Type: </strong>
                  {user.type}
                </p>

                <a href="edit-profile" className="btn btn-outline-primary">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                  <span className="ms-2">Edit Profile</span>
                </a>
              </div>
            </>
          )}

          {user && user.type !== "root" && userGym && (
            <div className="col-xs-12 col-md-12 ms-auto">
              <h2 style={{ "font-weight": 300 }}>Gym Details</h2>

              <p>
                <strong>Gym Name: </strong>
                {userGym.branch}
              </p>
              <p>
                <strong>Gym Address: </strong>
                {userGym.location}
              </p>
              <p>
                <strong>Gym Phone: </strong>
                {userGym.phone}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
