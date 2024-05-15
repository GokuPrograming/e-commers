import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../authUtils';
import PDF from './pdf_componente';

function ListaPdf() {
    const [pedido, setPedido] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const userId = getUserIdFromToken(token);
                const apiUrl = 'https://api-cuchau-store-pg.onrender.com/user/MostrarPedido';
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
                setPedido(responseData.data);
                setIsLoading(false);

            } catch (error) {
                console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
                setError(error instanceof Error ? error.message : String(error));
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md">
            <div className="rounded-xl border border-gray-200 bg-white py-6 px-4 shadow-md max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between px-2 text-base font-medium text-gray-700 p-2">
                    <div>Add Block</div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col">
                        {pedido.map((item, index) => (
                            <div key={index} className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-100 w-full">
                                <div className="flex flex-col items-start justify-between font-light text-gray-600">
                                    <p className="text-sm md:text-lg mb-1">PEDIDO #:{item.id_pedido}</p>
                                    <span className="text-xs">Fecha:{item.fecha}</span>
                                    <PDF pedidoId={item.id_pedido} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListaPdf;
