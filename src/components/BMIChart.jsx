import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BMIChart({ data, numClients }) {
  console.log(data);

  const randomColor = () => {
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
    return colors[Math.floor(Math.random() * colors.length)];
  };

  function getMin(arr) {
    return Math.min(...arr.map((e) => (Array.isArray(e) ? getMax(e) : e)));
  }

  function getMax(arr) {
    return Math.max(...arr.map((e) => (Array.isArray(e) ? getMax(e) : e)));
  }

  return (
    <div className="chart-div w-100">
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[getMin(data), getMax(data)]}
            label={{ value: "BMI Score", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />

          {numClients ? (
            [...Array(numClients)].map((e, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={"client" + (i + 1)}
                stroke={randomColor()}
                activeDot={{ r: 5 }}
              />
            ))
          ) : (
            <Line
              type="monotone"
              dataKey="bmi"
              stroke={"red"}
              activeDot={{ r: 5 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BMIChart;
