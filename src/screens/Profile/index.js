import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile";
import ProfilePage from "./ProfilePage";

const Profile = () => {
  return (
    // <div className="row">
    <Routes>
      <Route path="/" element={<Navigate to="profile" />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="edit-profile" element={<EditProfile />} />
    </Routes>
    // </div>
  );
};

export default Profile;
