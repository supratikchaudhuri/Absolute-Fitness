import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import { getUser } from "../../api/user";

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    const res = await getUser(username);
    setProfile(res);
  };
  console.log(username);
  console.log(profile);

  useEffect(() => {
    getProfile();
  }, []);

  return profile ? (
    <div className="container row">
      <div className="col-sm-12 col-md-2 fit-content mb-3 mt-5">
        <div></div>
        <i className="ms-auto fa fa-user avatar mb-3" aria-hidden="true"></i>
        <br />
      </div>

      <div className="col-sm-12 col-md-10 ms-auto mt-5">
        <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>
          {profile.name}
        </h2>

        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phone}
        </p>
        <p>
          <strong>Sex:</strong> {profile.sex}
        </p>
        <p>
          <strong>Date of Birth:</strong> {profile.dob}
        </p>

        <p>
          <strong>User Type:</strong> {profile.type}
        </p>
      </div>
    </div>
  ) : (
    <AlertBox type="danger" message="User not found" />
  );
};

export default PublicProfile;
