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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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

  const colors = [
    "#D73B1A",
    "#D7C61A",
    "#20D71A",
    "#1AC8D7",
    "#1AD76C",
    "#1AA4D7",
    "#1A2FD7",
    "#631AD7",
    "#D10BE6",
    "#E60BAC",
    "#E60B2E",
    "#899B05",
    "#059A9B",
    "#09F2F3",
  ];

  const getSubscribedCount = (gymId) => {
    return users.filter((user) => user.subscribed && user.gym_id === gymId)
      .length;
  };

  const getNonSubscribedCount = (gymId) => {
    return users.filter((user) => !user.subscribed && user.gym_id === gymId)
      .length;
  };

  const subscribedVsNonSubscribedData = gyms.map((gym) => ({
    gym_id: gym.gym_id,
    subscribed: getSubscribedCount(gym.gym_id),
    nonSubscribed: getNonSubscribedCount(gym.gym_id),
  }));

  const CustomLabel = ({ value }) => (
    <text x={0} y={0} dy={-10} fill="#8884d8" textAnchor="middle">
      {value}
    </text>
  );

  return (
    <div className="container center">
      <h4>Analytics Dashboard</h4>
      <h6>Subscribed vs Non-Subscribed Users in Each Gym</h6>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart width={600} height={400} data={subscribedVsNonSubscribedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="gym_id"
            label={{ value: "Gym ID", position: "insideBottom" }}
          />
          <YAxis
            label={{ value: "Frequency", angle: -90, position: "insideLeft" }}
          />
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
      </ResponsiveContainer>

      <br />
      <br />
      <br />

      {/* Pie Charts for User to Trainer Distribution */}
      {gyms.map((gym, idx) => {
        const gymUsers = users.filter((user) => user.gym_id === gym.gym_id);
        const gymStaffs = staffs.filter((staff) => staff.gym_id === gym.gym_id);

        const userDistributionData = [
          { name: "Users", value: gymUsers.length },
          { name: "Trainers", value: gymStaffs.length },
        ];

        console.log(userDistributionData);

        return (
          <div key={gym.gym_id}>
            <h6>{`User to Trainer Distribution for Gym ${gym.gym_id}`}</h6>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  //   fill="#059A9B"
                  label
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
