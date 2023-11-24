import React, { useState } from "react";

import axios from "axios";
import "../../profileStyles.css";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    ...user,
    ["password"]: null,
  });

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
          <div className="col-xs-12 col-md-4 width-auto fit-content mb-3">
            <i className="fa fa-user avatar mb-3" aria-hidden="true"></i>
            <br />
            <a href="edit-profile" className="float-end">
              <button className="btn btn-outline-primary ">
                <i className="fa fa-pencil" aria-hidden="true"></i>
                <span className="ms-2">Edit Profile</span>
              </button>
            </a>
          </div>

          <div className="col-xs-12 col-md-8">
            <h2 style={{ "font-weight": 300 }}>{user.name}</h2>

            <p>Phone: {user.phone}</p>

            <h3 className="title">Biography</h3>
            <p>Student, SWE, Actively seeking Internships</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
