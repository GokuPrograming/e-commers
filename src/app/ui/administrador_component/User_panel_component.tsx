"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../authUtils';
const token = Cookies.get('token');


const User_panel_component: React.FC = () => {
    const [datos, setDatos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
        try {
            if (token) {
                const userId = getUserIdFromToken(token);
                const apiUrl = 'https://api-cuchau-store-pg.onrender.com/admin/panel_user/';
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
        <div>
            <h2 className="text-lg font-semibold mb-4 text-center">Lista de Usuarios</h2>
            <div className="rounded-xl  bg-white py-6 px-4 shadow-md max-h-80 overflow-y-auto">
            <div className="rounded-xl  bg-white py-6 px-4 shadow-md max-h-100 overflow-y-auto">
                <table className="min-w-full max-w-full overflow-auto">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2">Asignar Rol</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {datos.map((dato, index) => (
                            <tr className="bg-gray-100" key={index} >
                                <td className="px-4 py-2 text-center">{dato.nombre}</td>

                                <td className="px-4 py-2 text-center">{dato.rol}</td>

                                <td className="px-4 py-2 text-center">
                                    <select className="px-4 py-2 text-center">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
        </div>
     
    )
}

export default User_panel_component