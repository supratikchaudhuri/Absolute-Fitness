import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TreemapChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [
          { x: "New Delhi", y: 218 },
          { x: "Kolkata", y: 149 },
          { x: "Mumbai", y: 184 },
          { x: "Ahmedabad", y: 55 },
          { x: "Bangaluru", y: 84 },
          { x: "Pune", y: 31 },
          { x: "Chennai", y: 70 },
          { x: "Jaipur", y: 30 },
          { x: "Surat", y: 44 },
          { x: "Hyderabad", y: 68 },
          { x: "Lucknow", y: 28 },
          { x: "Indore", y: 19 },
          { x: "Kanpur", y: 29 },
        ],
      },
    ],
    options: {
      legend: {
        show: false,
      },
      chart: {
        height: 350,
        type: "treemap",
      },
      title: {
        text: "Basic Treemap",
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="treemap"
        height={350}
      />
    </div>
  );
};

export default TreemapChart;
