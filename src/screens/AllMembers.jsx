import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/user";
import AlertBox from "../components/AlertBox";
import Table from "../components/Table";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };
  console.log(users);
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container center">
      <h4>Absolute Fitness Users</h4>
      {users.length ? (
        <Table
          content="members"
          data={users}
          setUsers={setUsers}
          firstItemLink={true}
          firstItemPath={{ name: "Profile", path: "/user/profile" }}
        />
      ) : (
        <AlertBox message="No users found" type="danger" />
      )}
    </div>
  );
};

export default AllUsers;
