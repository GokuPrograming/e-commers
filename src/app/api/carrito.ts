import { getUserIdFromToken } from '@/app/ui/authUtils';
import Cookies from 'js-cookie';
import React from 'react';
const token = Cookies.get('token');

export const fetchCartItems = async (
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>,
    setUserId: React.Dispatch<React.SetStateAction<number | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        // Obtener el token dentro de la función para asegurarse de que se actualice si cambia

        if (!token) {
            throw new Error('Token no encontrado');
        }

        // Obtener el id_usuario del token
        const userIdFromToken = getUserIdFromToken(token);
        setUserId(userIdFromToken);
        const apiUrl = 'https://api-cuchau-store-pg.onrender.com/user/car';

        // Realizar la solicitud POST a la API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_usuario: userIdFromToken // Utilizar el id_usuario obtenido del token
            })
        });

        // Verificar si la solicitud se envió correctamente
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos');
        }
        const responseData = await response.json();
        setCartItems(responseData.data); // Ajustar para manejar el nuevo formato de respuesta
        setLoading(false);
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        setLoading(false);
    }
};
