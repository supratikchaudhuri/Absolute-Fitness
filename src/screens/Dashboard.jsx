import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { getAllGyms } from "../api/gym";
import { getAllUsers } from "../api/user";
import { getAllStaffs } from "../api/staff";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [gyms, setGyms] = useState([]);
  const [users, setUsers] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const fetchGyms = async () => {
    const res = await getAllGyms();
    setGyms(res);
  };
  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };
  const fetchStaffs = async () => {
    const res = await getAllStaffs();
    setStaffs(res);
  };

  useEffect(() => {
    fetchGyms();
    fetchUsers();
    fetchStaffs();
  }, []);

  const getSubscribedCount = (gymId) => {
    console.log(
      users.filter((user) => user.subscribed && user.gym_id === gymId)
    );
    return users.filter((user) => user.subscribed && user.gym_id === gymId)
      .length;
  };

  const getNonSubscribedCount = (gymId) => {
    return users.filter((user) => !user.subscribed && user.gym_id === gymId)
      .length;
  };

  console.log(gyms);
  console.log(users);

  const subscribedVsNonSubscribedData = gyms.map((gym) => ({
    gym_id: gym.gym_id, // Fix: use gym.gym_id instead of gym.id
    subscribed: getSubscribedCount(gym.gym_id),
    nonSubscribed: getNonSubscribedCount(gym.gym_id),
  }));

  const CustomLabel = ({ value }) => (
    <text x={0} y={0} dy={-10} fill="#8884d8" textAnchor="middle">
      {value}
    </text>
  );
  console.log(subscribedVsNonSubscribedData);
  return (
    <div className="container center">
      <h4>Analytics Dashboard</h4>

      {/* Stacked Bar Chart */}
      <BarChart width={600} height={400} data={subscribedVsNonSubscribedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gym_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="subscribed" stackId="a" fill="#8884d8">
          {subscribedVsNonSubscribedData.map((entry, index) => (
            <Label
              key={index}
              content={<CustomLabel value={entry.subscribed} />}
              position="insideTop"
            />
          ))}
        </Bar>
        <Bar dataKey="nonSubscribed" stackId="a" fill="#82ca9d">
          {subscribedVsNonSubscribedData.map((entry, index) => (
            <Label
              key={index}
              content={<CustomLabel value={entry.nonSubscribed} />}
              position="insideTop"
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Dashboard;
