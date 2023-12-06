import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import { getUser } from "../../api/user";

const GlobalProfilePage = () => {
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
    <div>
      <h1>{profile.name}</h1>
      <h1>{profile.email}</h1>
      <h1>{profile.phone}</h1>
      <h1>{profile.type}</h1>
    </div>
  ) : (
    <AlertBox type="danger" message="User not found" />
  );
};

export default GlobalProfilePage;
