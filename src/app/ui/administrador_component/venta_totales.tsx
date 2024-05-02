"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../authUtils';
const token = Cookies.get('token');

const Venta_totales: React.FC = () => {

    const [datos, setDatos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
      try {
          const userId = getUserIdFromToken(token);
          const apiUrl = 'http://localhost:3000/admin/ventasSemanales/';
          const requestBody = {
              id_usuario: userId,
          };
  
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(requestBody)
          });
  
          if (!response.ok) {
              throw new Error('No se pudo obtener los datos');
          }
  
          const responseData = await response.json();
          console.log(responseData.data);  // Verifica los datos recibidos
  
          setDatos(responseData.data);  // Actualiza el estado datos con los datos recibidos
          setIsLoading(false);
  
      } catch (error) {
          console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
          setError(error instanceof Error ? error.message : String(error));
          setIsLoading(false);
      }
  };
  useEffect(() => {
      fetchData();
  }, []);
  
    return (
        <>
            <div className="text-xl font-bold mb-4 text-center">Ventas Totales</div>
            <div className="overflow-x-auto">
                <div className="text-lg font-semibold mb-4 text-center">Total de ventas semanales</div>
                <div className="rounded-xl border border-gray-200 bg-white py-6 shadow-md max-h-80 overflow-y-auto">
                    <table className="min-w-full max-w-full overflow-auto">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="px-4 py-2 text-center">Semana</th>
                                <th className="px-4 py-2 text-center">No. semana</th>
                                <th className="px-4 py-2 text-center">Mes</th>
                                <th className="px-4 py-2 text-center">Año</th>
                                <th className="px-4 py-2 text-center">Total ventas de la semana</th>
                            </tr>
                        </thead>
                        <tbody>
                        {datos.map((dato, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-center">{dato.semana}</td>
                                <td className="px-4 py-2 text-center">{dato.semana_del_mes}</td>
                                <td className="px-4 py-2 text-center">{dato.mes}</td>
                                <td className="px-4 py-2 text-center">{dato.año}</td>
                                <td className="px-4 py-2 text-center">{dato.total_ventas_semana}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br /><br /><br /></>
    )
}

export default Venta_totales