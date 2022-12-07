import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
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

//https://recharts.org/en-US/api
function BMIChart({data, numClients}) {
  console.log(data);
  console.log(numClients);

  const randomColor = () => Math.floor(Math.random()*16777215).toString(16);

  function getMin(arr) {
    return Math.min(...arr.map(e => Array.isArray(e) ? getMax(e) : e));
  }

  function getMax(arr) {
    return Math.max(...arr.map(e => Array.isArray(e) ? getMax(e) : e));
  }

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
        <XAxis dataKey="date"/>
        <YAxis domain={[getMin(data), getMax(data)]}/>
        <Tooltip />
        <Legend />

        { 
          numClients 
          ?
          [...Array(numClients)].map((e, i) => 
              <Line type="monotone" dataKey={"bmi"+(i+1)} stroke={"#" + randomColor()} activeDot={{ r: 5 }}/>
              )
          :
          <Line type="monotone" dataKey="bmi" stroke={"#" + randomColor()} activeDot={{ r: 5 }}/>
        }        

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



