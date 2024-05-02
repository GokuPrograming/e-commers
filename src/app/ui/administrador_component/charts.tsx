import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Registrar los elementos y escalas necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title);

function Charts() {
  const [chartSize, setChartSize] = useState({ width: 600, height: 400 }); // Tamaño predeterminado

  useEffect(() => {
    function handleResize() {
      // Ajusta el tamaño del gráfico según el tamaño de la pantalla
      if (window.innerWidth <= 768) {
        setChartSize({ width: window.innerWidth * 0.9, height: 120 });
      } else {
        setChartSize({ width: 600, height: 400 });
      }
    }

    handleResize(); // Llama a la función para ajustar el tamaño inicialmente

    // Agrega un event listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas 2024',
        data: [12, 19, 3, 5, 2],
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
    <div className="">
      <h1 className="text-lg font-semibold flex justify-center items-center">Gráfico de Ventas Mensuales</h1>
      <div className="flex justify-center items-center" style={{ width: chartSize.width, height: chartSize.height }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Charts;
