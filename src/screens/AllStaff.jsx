import React, { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import Table from "../components/Table";
import { getAllStaffs } from "../api/staff";

const AllStaff = () => {
  const [staffs, setStaffs] = useState([]);

  const fetchStaffs = async () => {
    const res = await getAllStaffs();
    setStaffs(res);
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  console.log(staffs);

  return (
    <div className="container center">
      <h4>Absolute Fitness Staff</h4>
      <h6>Got {staffs.length} staff</h6>
      {staffs.length ? (
        <Table content="staffs" data={staffs} setUsers={setStaffs} />
      ) : (
        <AlertBox message="No users found" type="danger" />
      )}
    </div>
  );
};

export default AllStaff;
