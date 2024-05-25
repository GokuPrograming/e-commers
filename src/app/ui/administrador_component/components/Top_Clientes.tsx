"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../../authUtils';
const token = Cookies.get('token');
// Definición del componente funcional
  const Top_Clientes: React.FC = () => {
    // Retorna el JSX que representa la UI del componente
    const [datos, setDatos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
      try {
          if(token){
          const userId = getUserIdFromToken(token);
          const apiUrl = 'https://api-cuchau-store-pg.onrender.com/admin/TopUsers';
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
      <>
       <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold leading-none text-gray-900">
                      Latest Customers
                    </h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
                    >
                      View all
                    </a>
                  </div>
                  <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                    {datos.map((dato, index) => (
                      <li key={index} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {dato.nombre}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="17727a767e7b57607e7973646372653974787a"
                              >
                                {dato.fecha}
                              </a>
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          ${dato.total}
                          </div>
                        </div>
                      </li>
                    ))}
                    </ul>
                  </div>
                </div>
      </>
    );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default Top_Clientes;
