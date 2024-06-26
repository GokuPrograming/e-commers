import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getUserIdFromToken } from '../authUtils';
import Cookies from 'js-cookie';
import { Chart, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
interface ChartDataItem {
    mes: any;
    cantidad:any;
    // Agrega otras propiedades según la estructura de tus datos
  }
// Registrar los elementos y escalas necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title);
const token:any = Cookies.get('token');

function Charts() {
    // const [chartData, setChartData] = useState(null);
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const userId = getUserIdFromToken(token);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api-cuchau-store-pg.onrender.com/user/grafica/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_usuario: userId }),
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
        plugins: {
            // legend: {
            //     display: true,
            //     position: 'top',
            // },
        },
        // scales: {
        //     x: {
        //         type: 'category',
        //         beginAtZero: true,
        //     },
        //     y: {
        //         beginAtZero: true,
        //     },
        // },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h1 style={{ textAlign: 'center' }}>TODO ESTO HAZ COMPRADO EN LOS ULTIMOS MESES</h1>
            <div style={{ width: '100%', height: '100%' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default Charts;
