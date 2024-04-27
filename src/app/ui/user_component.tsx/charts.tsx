import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Registrar los elementos y escalas necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title);

function Charts() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/user/grafica/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_usuario: 14 }),
        });
        const data = await response.json();
        setChartData(data.data);
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Datos y opciones del gráfico
  const data = {
    labels: chartData ? chartData.map(item => item.mes) : [],
    datasets: [
      {
        label: 'Ventas 2024',
        data: chartData ? chartData.map(item => item.cantidad) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h1>TODO ESTO HAZ COMPRADO EN LOS ULTIMOS MESES</h1>
      <div style={{ width: '100%', height: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Charts;
