import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = (data) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance before creating a new one
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create the new chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.plotData.map((_, i) => i),
        datasets: [
          {
            label: "Fix Error (m)",
            data: data.plotData.map((value, index) => ({
              x: index + 1,
              y: value,
            })),
            borderColor: "rgba(175, 92, 92, 1)",
            backgroundColor: "rgba(255, 255, 255, 1)",
            color: "rgba(75, 92, 192, 1)",
            tension: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animations: {
          tension: {
            duration: 500,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        elements: {
          line: {
            borderWidth: 1,
            borderJoinStyle: "bevel",
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Plot of Fix Error with repect to reference coordinates against index number",
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
