import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BMIChart from '../components/BMIChart'

function MemberHealthRecord() {
  const [memberHealthRecord, setMemberHealthRecord] = useState({});

  const user = localStorage.getItem('user');
  console.log(user);

  const dummyData = [
    {
      name: "11 nov",
      uv: 4000,
      pv: 2400,
      amt: 2400,
      ram: 5000
    },
    {
      name: "11 dec",
      uv: 3000,
      pv: 1398,
      amt: 3600,
      ram: 5000
    },
    {
      name: "11 jan",
      uv: 2000,
      pv: 9800,
      // amt: 2290,
      ram: 5000
    },
    {
      name: "11 feb",
      uv: 2780,
      pv: 3908,
      // amt: 2000,
      ram: 5000
    },
    {
      name: "11 mar",
      uv: 1890,
      pv: 4800,
      // amt: 2181,
      // ram: 5000
    },
    {
      name: "11 apr",
      uv: 2390,
      pv: 3800,
      // amt: 2500,
      ram: 5000
    },
    {
      name: "11 may",
      uv: 3490,
      pv: 4300,
      // amt: 2100,
      ram: 5000
    }
  ];

  useEffect(() => {
    const getHealthRecord = async () => {
      // const res = await axios.get(`${user.phone}/healthRecord`);
      // setMemberHealthRecord(res.data);

      setMemberHealthRecord(dummyData)
      
    }
  })

  return (
    <div>
      <p>height: </p>
      <p>weigh: t</p>
      <BMIChart data={memberHealthRecord}></BMIChart>
    </div>
  )
}

export default MemberHealthRecord