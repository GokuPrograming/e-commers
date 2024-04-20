//se treran los tokens
// se traera la validacion
// se traeran los productos
"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../authUtils';
const token = Cookies.get('token');

type Usuario = {
    correo: string,
    password: string,
    fecha_registro: Date,
    fecha_nacimiento: Date,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    telefono: string
}

type UsuarioPromps = {
    usuario: Usuario;
}

const ProductoComponent: React.FC = () => {

    const [datos, setDatos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
        try {
            const userId = getUserIdFromToken(token);
            const apiUrl = 'http://localhost:3000/perfil_usuario';
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
            console.log(responseData);  // Verifica los datos recibidos

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
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>

            <div className="mb-2 flex justify-between items-center">
                <div>
                    <span className="font-semibold text-gray-700">Nombre:</span>
                    <span className="text-gray-600">
                        {datos.length > 0 && datos[0].nombre}
                    </span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 17a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2H3zm2-2h14V4H5v11z" />
                        <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l10-10zM13 7.414L10.414 10 13 12.586 15.586 10 13 7.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="mb-2 flex justify-between items-center">
                <div>
                    <span className="font-semibold text-gray-700">Edad:</span>
                    <span className="text-gray-600"> {datos.length > 0 && datos[0].apellido_paterno}</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 17a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2H3zm2-2h14V4H5v11z" />
                        <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l10-10zM13 7.414L10.414 10 13 12.586 15.586 10 13 7.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="mb-2 flex justify-between items-center">
                <div>
                    <span className="font-semibold text-gray-700">Correo Electrónico:</span>
                    <span className="text-gray-600"> {datos.length > 0 && datos[0].correo}</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 17a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2H3zm2-2h14V4H5v11z" />
                        <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l10-10zM13 7.414L10.414 10 13 12.586 15.586 10 13 7.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="mb-2 flex justify-between items-center">
                <div>
                    <span className="font-semibold text-gray-700">Teléfono:</span>
                    <span className="text-gray-600">{datos.length > 0 && datos[0].telefono}</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 17a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2H3zm2-2h14V4H5v11z" />
                        <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l10-10zM13 7.414L10.414 10 13 12.586 15.586 10 13 7.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <span className="font-semibold text-gray-700">Dirección:</span>
                    <span className="text-gray-600">{datos.length > 0 && datos[0].fecha_nacimiento}</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 17a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2H3zm2-2h14V4H5v11z" />
                        <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l10-10zM13 7.414L10.414 10 13 12.586 15.586 10 13 7.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>


    );
}

export default ProductoComponent;
