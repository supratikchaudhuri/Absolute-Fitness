import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TreemapChart = ({ dataObj }) => {
  console.log(dataObj);
  const [chartData, setChartData] = useState({
    series: [
      {
        data: Object.entries(dataObj).map(([key, value]) => ({
          x: key,
          y: value,
        })),
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
        text: "Nutrition Distribution",
      },
    },
  });

  useEffect(() => {
    const sortedDataObj = Object.entries(dataObj).sort((a, b) => b[1] - a[1]);
    dataObj = Object.fromEntries(sortedDataObj);

    setChartData((prevChart) => ({
      ...prevChart,
      series: [
        {
          data: Object.entries(dataObj).map(([key, value]) => ({
            x: key,
            y: value,
          })),
        },
      ],
    }));
  }, [dataObj]);

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
