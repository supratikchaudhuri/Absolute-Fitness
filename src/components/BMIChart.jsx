import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function BMIChart({data}) {
  console.log(data);
// function BMIChart() {
  const randomColor = () => Math.floor(Math.random()*16777215).toString(16);
  
  // const data = [
  //   {
  //     date: "11 nov",
  //     bmi: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //     ram: 5000
  //   },
  //   {
  //     date: "11 dec",
  //     bmi: 3000,
  //     pv: 1398,
  //     amt: 3600,
  //     ram: 5000
  //   },
  //   {
  //     date: "11 jan",
  //     bmi: 2000,
  //     pv: 9800,
  //     // amt: 2290,
  //     ram: 5000
  //   },
  //   {
  //     date: "11 feb",
  //     bmi: 2780,
  //     pv: 3908,
  //     // amt: 2000,
  //     ram: 5000
  //   },
  //   {
  //     date: "11 mar",
  //     bmi: 1890,
  //     pv: 4800,
  //     // amt: 2181,
  //     // ram: 5000
  //   },
  //   {
  //     date: "11 apr",
  //     bmi: 2390,
  //     pv: 3800,
  //     // amt: 2500,
  //     ram: 5000
  //   },
  //   {
  //     date: "11 may",
  //     bmi: 3490,
  //     pv: 4300,
  //     // amt: 2100,
  //     ram: 5000
  //   }
  // ];

  return (
    <div className='chart-div'>
      <div>
      <LineChart
        width={1300}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[15, 55]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="bmi" stroke={"#" + randomColor()} activeDot={{ r: 5 }}/>
        {/* <Line type="monotone" dataKey="uv" stroke={"#" + randomColor()} />
        <Line type="monotone" dataKey="ram" stroke="black" /> */}
      </LineChart>
      </div>

      <div>
        <p><strong>BMI ranges</strong></p>
        <p>&lt; 18.5 Underweight</p>
        <p>18.5 - 24.9 Normal Weight</p>
        <p>25.0 - 29.9 Overweight</p>
        <p>30- 34.9 Obesity Class I</p>
        <p>35 - 39.9 Obesity Class II</p>
        <p>&gt; 40 Obesity Class III</p>
      </div>
    </div>
  )
}

export default BMIChart