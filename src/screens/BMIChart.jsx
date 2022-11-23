import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function BMIChart() {
  const randomColor = () => Math.floor(Math.random()*16777215).toString(16);
  
  const data = [
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

  return (
    <div className='chartDiv'>
      <LineChart
        width={1300}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke={"#" + randomColor()} activeDot={{ r: 8 }}/>
        <Line type="monotone" dataKey="uv" stroke={"#" + randomColor()} />
        <Line type="monotone" dataKey="ram" stroke="black" />
      </LineChart>
    </div>
  )
}

export default BMIChart