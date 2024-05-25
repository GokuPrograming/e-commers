"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../../authUtils';
const token = Cookies.get('token');

const Transacciones_model: React.FC=()=> {
  const [datos, setDatos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
        if(token){
        const userId = getUserIdFromToken(token);
        const apiUrl = 'https://api-cuchau-store-pg.onrender.com/admin/TopVentas';
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
    }
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
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Productos mas vendidos Ordenado por Estado
        </h3>
        <span className="text-base font-normal text-gray-500">
          Lista de los productos
        </span>
      </div>
      <div className="flex-shrink-0">
        <a
          href="#"
          className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
        >
          View all
        </a>
      </div>
    </div>
    <div className="flex flex-col mt-8">
      <div className="overflow-x-auto rounded-lg">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                   Producto
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  Total
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                   Cantidad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
              {datos.map((dato, index) => (
                <tr key={index} className="bg-gray-50">
                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                  {dato.producto}
                    <span className="font-semibold">
                      
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                  {dato.estado}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {dato.total}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {dato.cantidad}
                  </td>
                </tr>
             ))}
         
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Transacciones_model