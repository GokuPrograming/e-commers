"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../authUtils';
const token = Cookies.get('token');

const Venta_producto_component: React.FC = () =>  {
  const [datos, setDatos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {
        const userId = getUserIdFromToken(token);
        const apiUrl = 'http://localhost:3000/admin/ventasTotalesPorProducto/';
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
                    <h3 className="text-lg font-semibold mb-4 text-center">Total de Venta por Producto</h3>
                <div className="rounded-xl border border-gray-200 bg-white py-6 shadow-md max-h-80 overflow-y-auto">
                    <table className="min-w-full max-w-full overflow-auto">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="px-4 py-2 text-center">Producto</th>
                                <th className="px-4 py-2 text-center">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                        {datos.map((dato, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center">{dato.producto}</td>
                <td className="px-4 py-2 text-center">{dato.productos_comprados}</td>
              </tr>
            ))}
                        </tbody>
                    </table>
                </div>
                <br /><br /><br />
    </>
  )
}

export default Venta_producto_component