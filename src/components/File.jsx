import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';

const File = ({ questionnaire }) => {

  const generatePieChartData = (questionnaire) => {
    return {
      labels: ["Label 1", "Label 2", "Label 3"], 
      datasets: [
        {
          data: [questionnaire.data1, questionnaire.data2, questionnaire.data3],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  };

  const generateBarChartData = (questionnaire) => {
    return {
      labels: ["Label 1", "Label 2", "Label 3"], 
      datasets: [
        {
          label: "Valor",
          data: [questionnaire.data1, questionnaire.data2, questionnaire.data3],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

 
  const pieChartOptions = {
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="flex justify-center space-x-4">
        {}
        <div className="w-1/2">
          <Pie data={generatePieChartData(questionnaire)} options={pieChartOptions} />
        </div>
        {}
        <div className="w-1/2">
          <Bar data={generateBarChartData(questionnaire)} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default File;
